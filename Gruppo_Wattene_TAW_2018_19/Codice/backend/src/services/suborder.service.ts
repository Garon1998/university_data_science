import subOrderModel, { orderedDrinkSchema, orderedFoodSchema } from '../models/suborder.model';
import orderModel from '../models/order.model';
import OrderService from '../services/order.service';
import TableService from '../services/table.service';
import FoodService from '../services/food.service';
import DrinkService from '../services/drink.service';
import UserService from '../services/user.service';
import * as mongoose from 'mongoose';
import { ROLE, suborderstate } from '../_helpers/enum';
//var OrderState = require('../_helpers/orderstate');
const config = require('../../src/config.json');
import utility, { checkProperty } from '../_helpers/utility';
import { read } from 'fs';
import { threadId } from 'worker_threads';
class SubOrderService {
    public suborderModel = subOrderModel;
    public orderModel = subOrderModel;
    public tableService = new TableService();
    public foodService = new FoodService();
    public drinkService = new DrinkService();
    public userService = new UserService();
    public orderService = new OrderService();

    public getById = async (id: mongoose.Schema.Types.ObjectId) => {
        return await this.suborderModel.findById(id);
    }

    //HTPGET /orders/suborders
    //Get all suborder
    public getAllSubs = async () => {
        return await this.suborderModel.find();
    }
    //Get all suborder foods
    public getAllSubOrders = async (role, ready: boolean, type: string) => {
        if (type === "food" && (role !== ROLE.cuoco && role !== ROLE.cassa && role !== ROLE.cameriere))
            throw 401;
        if (type === "drink" && (role !== ROLE.barista && role !== ROLE.cassa && role !== ROLE.cameriere))
            throw 401;

        let result = null;
        if (type === "food") {
            if (!ready)
                result = await this.suborderModel.find({
                    $or: [{ state_foods: suborderstate.inpreparazione }, { state_foods: suborderstate.incoda }]
                }).sort({ createdAt: 1 });
            else
                result = await this.suborderModel.find({
                    $or: [{ state_foods: suborderstate.servito }, { state_foods: suborderstate.pronto }]
                }).sort({ createdAt: 1 });
        }
        if (type === "drink") {
            if (!ready)
                result = await this.suborderModel.find({
                    $or: [{ state_drinks: suborderstate.inpreparazione }, { state_drinks: suborderstate.incoda }]
                }).sort({ createdAt: 1 });
            else
                result = await this.suborderModel.find({
                    $or: [{ state_drinks: suborderstate.servito }, { state_drinks: suborderstate.pronto }]
                }).sort({ createdAt: 1 });
        }
        return result;
    }

    private tryToAddonPrevSubOrder = async (order_id: string, type, foodsORdrinks) => {
        let query = {};
        let cond_state = type === "food" ? "state_foods" : "state_drinks";
        let cond_ordered = type === "food" ? "ordered_foods" : "ordered_drinks";
        query['order_id'] = order_id;
        query[cond_state] = suborderstate.incoda;

        //console.log(query);
        let id = await this.suborderModel.find(query,
            (err, doc) => {
                if (err)
                    throw err;
                //console.log(doc);
                if (doc.length > 0) {
                    doc[0][cond_ordered] = foodsORdrinks;
                    doc[0].save().then(() => {
                        return doc[0]._id;
                    });
                }
            });
        return id.length > 0 ? id : null;
    }
    //HTTPPOST :order_id/suborders
    //aggiunge i cibi/bibite ad un sotto ordine esistente
    public create = async (order_id: string, subOrderParams) => {
        if (!utility.checkProperty(subOrderParams, "ordered_foods") && !utility.checkProperty(subOrderParams, "ordered_drinks"))
            utility.throwMissingProperty("foods and drinks");
        let order = await this.orderService.getOrderById(order_id);
        if (order === null) utility.throwDocumentNotFound("Order");
        if (order.paid) throw "Order already paid";

        const foods = subOrderParams.ordered_foods;
        const drinks = subOrderParams.ordered_drinks;
        subOrderParams.ordered_foods = [];
        subOrderParams.ordered_drinks = [];

        let i: number;
        if (foods) {
            for (i = 0; i < foods.length; i++) {
                const _food = await this.foodService.getById(foods[i].food_id);
                //se il cibo non esiste non verrà inserito nell'ordine
                if (_food == null || !utility.checkProperty(foods[i], 'quantity') || !utility.checkProperty(foods[i], 'food_id')) continue;

                const foodtoadd = {
                    food_id: foods[i].food_id,
                    quantity: foods[i].quantity,
                    time: _food.time,
                    name: _food.name,
                    price: _food.price
                };
                subOrderParams.ordered_foods.push(foodtoadd);
            }
        }
        if (drinks) {
            for (i = 0; i < drinks.length; i++) {
                const _drink = await this.drinkService.getById(drinks[i].drink_id);
                //se il drink non esiste non verrà inserito all'interno dell'ordine
                if (_drink == null || !utility.checkProperty(drinks[i], "quantity") || !utility.checkProperty(drinks[i], "drink_id"))
                    continue;

                const drinkToAdd = {
                    drink_id: drinks[i].drink_id,
                    quantity: drinks[i].quantity,
                    time: _drink.time,
                    name: _drink.name,
                    price: _drink.price,
                };
                subOrderParams.ordered_drinks.push(drinkToAdd);
            }
        }

        //Verifico se c'è un suborder fatto in precedenza che non è ancora in fase di preparazione, bensì in coda
        // se c'è aggiungo i cibi a quel suborder
        let prevSub_id_Food = null,
            prevSub_id_Drink = null;
        if (utility.checkProperty(subOrderParams, "ordered_foods")) {
            if (subOrderParams.ordered_foods.length > 0) {
                prevSub_id_Food = await this.tryToAddonPrevSubOrder(order_id, "food", subOrderParams.ordered_foods);
                if (prevSub_id_Food) // se ho aggiunto i cibi ad un suborder precedente elimino i cibi dai parametri ricevuti
                    delete subOrderParams.ordered_foods;
            }
            else
                delete subOrderParams.ordered_foods;
        }
        if (utility.checkProperty(subOrderParams, "ordered_drinks")) {
            if (subOrderParams.ordered_drinks.length > 0) {
                prevSub_id_Drink = await this.tryToAddonPrevSubOrder(order_id, "drink", subOrderParams.ordered_drinks)
                //console.log("---" + prevSub_id_Drink + "----");
                if (prevSub_id_Drink)
                    delete subOrderParams.ordered_drinks;
            }
            else
                delete subOrderParams.ordered_drinks;
        }
        let newSubOrder_id = null;
        let suborderDaCreare = false;
        // Se non sono riuscito ad aggiungere i cibi o le bibite ad un suborder precedente devo crearne uno
        if (utility.checkProperty(subOrderParams, "ordered_foods")) {
            suborderDaCreare = true;
            subOrderParams.ordered_foods = subOrderParams.ordered_foods.filter(x => x.quantity > 0)
        }
        if (utility.checkProperty(subOrderParams, "ordered_drinks")) {
            suborderDaCreare = true;
            subOrderParams.ordered_drinks = subOrderParams.ordered_drinks.filter(x => x.quantity > 0)
        }
        if (suborderDaCreare) {
            subOrderParams.order_id = order_id;
            const newSubOrder = new this.suborderModel(subOrderParams);
            await newSubOrder.save().then((doc) => {
                if (doc)
                    newSubOrder_id = doc._id;
            });
        }

        return await this.suborderModel.find({
            $or:
                [
                    { '_id': prevSub_id_Food },
                    { '_id': prevSub_id_Drink },
                    { '_id': newSubOrder_id },
                ]
        });
    }

    public setFoodReady = async (order_id, suborder_id, food_id, ready, user_id) => {
        const order = await this.orderService.getOrderById(order_id);
        if (order === null) throw "Order doesn't exists";
        let suborder = await this.getById(suborder_id);
        if (suborder === null) throw "Suborder doesn't exists";
        const user = await this.userService.getById(user_id);
        let prepared_by = null
        if (ready)
            prepared_by = user._id;
        await this.suborderModel.findOneAndUpdate(
            {
                _id: suborder._id,
                "ordered_foods.food_id": food_id
            },
            { "ordered_foods.$.prepared_by": prepared_by })


        let p = await this.suborderModel.find({
            '_id': suborder._id,
            'order_id': suborder.order_id
        });
        const tot = p[0].ordered_foods.length;
        const count = p[0].ordered_foods.filter(x => x.prepared_by != null).length;
        if (count === 0) {
            suborder.state_foods = suborderstate.incoda;
        }
        else if (count !== tot) {
            suborder.state_foods = suborderstate.inpreparazione;
        }
        await suborder.save();
    }
    public setDrinkReady = async (order_id, suborder_id, drink_id, ready, user_id) => {
        const order = await this.orderService.getOrderById(order_id);
        if (order === null) throw "Order doesn't exists";
        let suborder = await this.getById(suborder_id);
        if (suborder === null) throw "Suborder doesn't exists";
        const user = await this.userService.getById(user_id);
        let prepared_by = null
        if (ready)
            prepared_by = user._id;
        await this.suborderModel.findOneAndUpdate({
                _id: suborder._id,
                "ordered_drinks.drink_id": drink_id
            },
            { "ordered_drinks.$.prepared_by": prepared_by });


        let p = await this.suborderModel.find({
            '_id': suborder._id,
            'order_id': suborder.order_id
        });
        const tot = p[0].ordered_drinks.length;
        const count = p[0].ordered_drinks.filter(x => x.prepared_by != null).length;
        if (count === 0) {
            suborder.state_drinks = suborderstate.incoda;
        }
        else if (count !== tot) {
            suborder.state_drinks = suborderstate.inpreparazione;
        }
        await suborder.save();
    }

    public update = async (order_id, suborder_id, suborderParams) => {
        let order = await this.orderService.getOrderById(order_id);
        let suborder = await this.getById(suborder_id);
        if (utility.checkProperty(suborderParams, "foods_served")) {
            if (typeof suborderParams.foods_served !== "boolean")
                utility.throwMustBeEqualTo("foods_served", "boolean");
            if (suborderParams.foods_served)
                suborder.state_foods = suborderstate.servito;
        }
        if (utility.checkProperty(suborderParams, "drinks_served")) {
            if (typeof suborderParams.drinks_served !== "boolean")
                utility.throwMustBeEqualTo("drinks_served", "boolean");
            if (suborderParams.drinks_served)
                suborder.state_drinks = suborderstate.servito;
        }
        // set suborder ready 
        if (utility.checkProperty(suborderParams, "foods_ready")) {
            if (typeof suborderParams.foods_ready !== "boolean")
                utility.throwMustBeEqualTo("foods_ready", "boolean");
            if (suborderParams.foods_ready)
                suborder.state_foods = suborderstate.pronto;
        }
        if (utility.checkProperty(suborderParams, "drinks_ready")) {
            if (typeof suborderParams.drinks_ready !== "boolean")
                utility.throwMustBeEqualTo("drinks_ready", "boolean");
            if (suborderParams.drinks_ready)
                suborder.state_drinks = suborderstate.pronto;
        }

        Object.assign(suborder, suborderParams);
        await suborder.save();
        order.served = suborder.state_foods === suborderstate.servito && suborder.state_drinks === suborderstate.servito;
        await order.save();
        return suborder;
    }

    public deleteAll() {
        return this.suborderModel.deleteMany({});
    }
}
export default SubOrderService;