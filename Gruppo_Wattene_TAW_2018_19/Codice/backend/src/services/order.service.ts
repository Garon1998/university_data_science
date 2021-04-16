import orderModel from '../models/order.model';
import suborderModel from '../models/suborder.model';
import TableService from '../services/table.service';
import UserService from '../services/user.service';
import FoodService from '../services/food.service';
import DrinkService from '../services/drink.service';
import SubOrderService from '../services/suborder.service';
import * as mongoose from 'mongoose';
//var OrderState = require('../_helpers/orderstate');
const config = require('../../src/config.json');
import utility, { checkProperty } from '../_helpers/utility';

import { ROLE, suborderstate } from '../_helpers/enum';
class OrderService {
    public orderModel = orderModel;
    public suborderModel = suborderModel;
    public tableService = new TableService();
    public userService = new UserService();
    public foodService = new FoodService();
    public drinkService = new DrinkService();

    public getAll = async () => {
        return await this.orderModel.find();
    }

    public async getOrderById(id: string) {
        return await this.orderModel.findById(id);
    }

    //HTTPGET /orders/<order_id>/suborder
    //Get all suborder of a order specified using order_id
    public getSubOrdersByOrderID = async (id: string) => {
        const order = await this.getOrderById(id);
        if (order == null)
            throw "Order doesn't exists";
        return await this.suborderModel.find({ order_id: { $eq: id } });
    }




    /*SOLO Camerieri
    crea un nuovo ordine
        Dati richiesti -> table_id
                          clients
    */
    public async create(orderParams, user_id: mongoose.Schema.Types.ObjectId) {
        utility.checkAndThrow(orderParams, "table_id");

        const user = await this.userService.getById(user_id);
        let table = await this.tableService.getById(orderParams.table_id);
        if (utility.hasProperty(orderParams, "clients")) {
            if (table.clients != orderParams.clients)
                await this.tableService.update(table._id, { clients: orderParams.clients }, user.role)
                    .then(doc => table = doc);
        }
        orderParams.clients = table.clients;
        orderParams.waiter_id = user_id;
        const neworder = new this.orderModel(orderParams);
        await neworder.save((err, order) => {
            if (order)
                this.tableService.update(orderParams.table_id, { order_id: order._id }, user.role);
        });
        return neworder;
    }

    public async update(id: string, orderParams, role) {
        let order = await this.getOrderById(id);
        if (!order) throw utility.throwDocumentNotFound("Order");
        //Ottengo il tavolo associato all'ordine
        let table = await this.tableService.getById(order.table_id);

        //operazione della cassa per indicare l'ordine come pagato
        if (utility.hasProperty(orderParams, "paid") && typeof orderParams.paid === "boolean" && orderParams.paid) {
            if (role !== ROLE.cassa)
                throw 401; /* Unauthorized,i camerieri possono indicare solo il servito */

            // ottiene tutti i suborders e calcola il totale dell'ordine
            let suborders = await this.getSubOrdersByOrderID(order.id);
            for (let i = 0; i < suborders.length; i++) {
                let j = 0;
                for (j = 0; j < suborders[i].ordered_foods.length; j++)
                    order.amount += suborders[i].ordered_foods[j].price * suborders[i].ordered_foods[j].quantity;
                j = 0;
                for (j = 0; j < suborders[i].ordered_drinks.length; j++)
                    order.amount += suborders[i].ordered_drinks[j].price * suborders[i].ordered_drinks[j].quantity;
            }
            order.paid = true;
        }
        else {
            /*
                Se nel body della request è presente anche amount viene
                cancellato perché viene settato solo quando paid == true
            */
            delete orderParams.amount;
            delete orderParams.table_id;
            delete orderParams.waiter_id;

            if (utility.checkProperty(orderParams, "clients")) {
                if (!Number.isInteger(orderParams.clients))
                    utility.throwIntRequiredForProperty("clients");
                this.tableService.update(order.table_id, { clients: orderParams.clients }, role);
            }
            Object.assign(order, orderParams);
        }
        await order.save();
        return order;
    }

    public async delete(order_id: string, user_id: mongoose.Schema.Types.ObjectId) {
        const user = await this.userService.getById(user_id);
        const order = await this.getOrderById(order_id);
        if (!order) utility.throwDocumentNotFound("order");
        if (user.role === ROLE.cameriere && user._id != order.waiter_id)
            throw 403;
        let table_id = order.table_id;

        // La cassa può eliminare qualsiasi ordine
        // Vengono eliminati prima i suborders associati e poi l'ordine principale
        await this.suborderModel.deleteMany({
            'order_id': order_id
        }, () => {
            order.remove();
            this.tableService.update(table_id, { available: true }, user.role);
        });
    }
    public deleteAll() {
        return this.orderModel.deleteMany({});
    }
}
export default OrderService;