import express = require('express');
import OrderService from '../services/order.service';
import SubOrderService from '../services/suborder.service';
let authorize = require('../_helpers/authorize');
import { ROLE } from '../_helpers/enum';
import ios from '../index';
import utility from '../_helpers/utility';
class OrderController {
    public router = express.Router();
    public orderService = new OrderService();
    public subOrderService = new SubOrderService();

    constructor() {
        this.initializeRoutes();
    }
    // routes
    private initializeRoutes() {
        // routes
        this.router.get(
            '/',
            this.getAll
        );

        this.router.get(
            '/suborders',
            authorize([ROLE.cassa, ROLE.cuoco, ROLE.cameriere, ROLE.barista]),
            this.getSuborders
        );

        //waiters and admins only
        this.router.post(
            '/',
            authorize([ROLE.cameriere, ROLE.cassa]),
            this.create
        );

        // I camerieri possono eliminare solo gli ordini associati a loro
        //waiters and admins only
        this.router.delete(
            '/:id',
            authorize([ROLE.cameriere, ROLE.cassa]),
            this.delete
        );

        //?ready=false/true
        //waiters, admins, chefs
        /* this.router.get(
            '/suborders/foods',
            authorize([ROLE.cassa, ROLE.cuoco, ROLE.cameriere]),
            this.getAllSubOrdersFoods
        ); */

        /* this.router.get(
            '/suborders/drinks',
            authorize([ROLE.cassa, ROLE.barista, ROLE.cameriere]),
            this.getAllSubOrdersDrinks
        );
 */
        //Ottiene i suborders di uno specifico ordine
        // all authorized users
        this.router.get(
            '/:order_id/suborders',
            authorize([ROLE.cameriere, ROLE.cassa, ROLE.cuoco, ROLE.barista]),
            this.getSubOrdersByOrderID
        );

        // Crea un nuovo suborder
        // waiters and admins only
        this.router.post(
            '/:order_id/suborders',
            authorize([ROLE.cameriere, ROLE.cassa]),
            this.createSubOrder
        );

        // waiters, chefs and admins
        this.router.put(
            '/:order_id/suborders/:suborder_id/foods/:food_id',
            authorize([ROLE.cuoco, ROLE.cameriere, ROLE.cassa]),
            this.setFoodReady
        );

        // barman and admins only
        this.router.put(
            '/:order_id/suborders/:suborder_id/drinks/:drink_id',
            authorize([ROLE.barista, ROLE.cassa]),
            this.setDrinkReady
        );

        // all authorized users
        this.router.put(
            '/:order_id/suborders/:suborder_id',
            authorize([ROLE.cassa, ROLE.barista, ROLE.cuoco, ROLE.cameriere]),
            this.updateSuborder
        );

        // waiters and admins only
        // camerieri per indicare come servito
        this.router.put(
            '/:id',
            authorize([ROLE.cameriere, ROLE.cassa]),
            this.update
        );

        // all authorized users
        this.router.get(
            '/:id',
            authorize([ROLE.cameriere, ROLE.cassa, ROLE.barista, ROLE.cuoco]),
            this.getById
        );
    }




    public getAll = async (req, res, next) => {
        this.orderService.getAll()
            .then(order => order ? res.json(order) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }
    public getById = async (req, res, next) => {
        this.orderService.getOrderById(req.params.id)
            .then(order => order ? res.json(order) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }

    public create = async (req, res, next) => {
        this.orderService.create(req.body, req.user.sub)
            .then(order => order ? (ios.emit("nuovo_ordine", order), res.json(order)) : res.status(400))
            .catch(err => utility.errorHandler(res, next, err));
    }

    public update = async (req, res, next) => {
        this.orderService.update(req.params.id, req.body, req.user.role)
            .then((order) => res.json(order))
            .catch(err => utility.errorHandler(res, next, err));
    }

    public delete = async (req, res, next) => {
        this.orderService.delete(req.params.id, req.user.sub)
            .then(() => {
                ios.emit("order_deleted", req.params.id);
                res.json({ id: req.params.id })
            })
            .catch(err => utility.errorHandler(res, next, err));
    }

    /*---------SUBORDER---------- */

    public getSuborders = async (req, res, next) => {
        if (!utility.checkProperty(req.query, "type")) {
            this.getAllSubOrders(req, res, next)
        }
        else {
            if (req.query.type === "food") {
                this.getAllSubOrdersFoods(req, res, next)
            }
            else if (req.query.type === "drink") {
                this.getAllSubOrdersDrinks(req, res, next)
            }
        }
    }

    //only admins, for stats
    public getAllSubOrders = async (req, res, next) => {
        this.subOrderService.getAllSubs()
            .then(subOrders => subOrders ? res.json(subOrders) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }

    //FOOD
    public getAllSubOrdersFoods = async (req, res, next) => {
        let ready = false;
        if (req.query.ready)
            ready = req.query.ready;

        this.subOrderService.getAllSubOrders(req.user.role, ready, "food")
            .then(subOrder => subOrder ? res.json(subOrder) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }
    //DRINK
    public getAllSubOrdersDrinks = async (req, res, next) => {
        let ready = null;
        if (req.query.ready)
            ready = req.query.ready;

        this.subOrderService.getAllSubOrders(req.user.role, ready, "drink")
            .then(subOrder => subOrder ? res.json(subOrder) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }
    public getSubOrdersByOrderID = async (req, res, next) => {
        this.orderService.getSubOrdersByOrderID(req.params.order_id)
            .then(subOrder => subOrder ? res.json(subOrder) : res.sendStatus(404))
            .catch(err => utility.errorHandler(res, next, err));
    }

    //crea un nuovo suborder
    //HTTPPOST orders/:order_id
    public createSubOrder = async (req, res, next) => {
        this.subOrderService.create(req.params.order_id, req.body)
            .then((doc) => {
                ios.emit("modified_suborder", doc);
                res.json(doc)
            })
            .catch(err => utility.errorHandler(res, next, err));
    }


    //HTTPPUT /orders/:order_id/suborders/:suborder_id/ordered_food/:food_id
    public setFoodReady = async (req, res, next) => {
        const order_ID = req.params.order_id;
        const suborder_ID = req.params.suborder_id;
        const food_ID = req.params.food_id;
        utility.checkAndThrow(req.body, "ready");
        let ready = req.body.ready;

        if (ready != null) {
            this.subOrderService.setFoodReady(order_ID, suborder_ID, food_ID, ready, req.user.sub)
                .then(() => {
                    this.subOrderService.getById(suborder_ID).then((doc) => {
                        ios.emit("modified_suborder_food", doc);
                        res.json(doc);
                    });
                })
                .catch(err => utility.errorHandler(res, next, err));
        }
    }

    //HTTPPUT /orders/:order_id/suborders/:suborder_id/ordered_drinks/:drink_id
    public setDrinkReady = async (req, res, next) => {
        const order_ID = req.params.order_id;
        const suborder_ID = req.params.suborder_id;
        const drink_ID = req.params.drink_id;
        utility.checkAndThrow(req.body, "ready");
        let ready = req.body.ready;

        if (ready != null) {
            this.subOrderService.setDrinkReady(order_ID, suborder_ID, drink_ID, ready, req.user.sub)
                .then(() => {
                    this.subOrderService.getById(suborder_ID).then((doc) => {
                        ios.emit("modified_suborder_drink", doc);
                        res.json(doc);
                    });
                })
                .catch(err => {
                    utility.errorHandler(res, err)
                });
        }
    }

    public updateSuborder = async (req, res, next) => {
        const order_ID = req.params.order_id;
        const suborder_ID = req.params.suborder_id;
        this.subOrderService.update(order_ID, suborder_ID, req.body)
            .then((doc) => {
                ios.emit("modified_suborder", [doc]);
                res.json([doc])
            })
            .catch(err => {
                utility.errorHandler(res, err)
            });
    }
}

export default OrderController;


