
// var config = require('../../src/config.json');
// var mongoose = require('mongoose');

// var userModel = require('../models/user.model');
var drinkModel = require('../models/drink.model');
// var tableModel = require('../models/table.model');
// var orderModel = require('../models/order.model');
// var foodModel = require('../models/food.model');

import UserService from '../services/user.service';
import OrderService from '../services/order.service';
import SuborderService from '../services/suborder.service';
import DrinkService from '../services/drink.service';
import FoodService from '../services/food.service';
import TableService from '../services/table.service';
import { foodCategory, drinkCategory, ROLE } from './enum';
module.exports = dbInit;
function dbInit() {
    const orderService = new OrderService();
    const suborderService = new SuborderService();
    const userService = new UserService();
    const drinkService = new DrinkService();
    const foodService = new FoodService();
    const tableService = new TableService();

    //cancella intero contenuto del database ad eccezione degli utenti
    /* if (process.env.NODE_ENV === 'test'){
        drinkModel.default.remove();
        tableModel.default.remove();
        orderModel.default.remove();
        foodModel.default.remove();
    }
 */
    const users = [
        { username: "cassa", firstname: "admin", lastname: "admin", role: ROLE.cassa, password: "password" },
        { username: "cameriere", firstname: "Matteo", lastname: "Schizzerotto", role: ROLE.cameriere, password: "password" },
        { username: "cuoco", firstname: "Goran", lastname: "Gajic", role: ROLE.cuoco, password: "password" },
        { username: "barista", firstname: "Paolo", lastname: "Porcellato", role: ROLE.barista, password: "password" },
    ];
    const tables = [
        { table_number: 1, available: true, total_seats: 5, clients: 0 },
        { table_number: 2, available: true, total_seats: 10, clients: 0 },
        { table_number: 3, available: true, total_seats: 15, clients: 0 },
        { table_number: 4, available: true, total_seats: 3, clients: 0 },
        { table_number: 5, available: true, total_seats: 3, clients: 0 },
        { table_number: 6, available: true, total_seats: 7, clients: 0 },
        { table_number: 7, available: true, total_seats: 8, clients: 0 },
    ];
    const foods = [
        { name: "Pasta al tonno", price: 6, time: 4, category: foodCategory.PrimoPiatto, available: true },
        { name: "Pasta allo scoglio", price: 14, time: 6, category: foodCategory.PrimoPiatto, available: true },
        { name: "Pasta al ragù", price: 6, time: 2, category: foodCategory.PrimoPiatto, available: true },
        { name: "Cotoletta e patatine fritte", price: 7.5, time: 15, category: foodCategory.SecondoPiatto, available: true },
        { name: "Insalatona", price: 5, time: 1, category: foodCategory.SecondoPiatto, available: true },
        { name: "Petto di pollo ai ferri", price: 8, time: 16, category: foodCategory.SecondoPiatto, available: true },
        { name: "Salmone ai ferri", price: 10, time: 10, category: foodCategory.SecondoPiatto, available: true },
        { name: "Vassoio di affettati", price: 10, time: 5, category: foodCategory.Contorno, available: true },
        { name: "Fagioli in salsa", price: 3.5, time: 4, category: foodCategory.Contorno, available: true },
    ]
    const drinks = [
        { name: "Acqua naturale", price: 2.5, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Acqua frizzante", price: 2.5, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Coca cola", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Fanta", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Pepsi", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Sprite", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Tè alla pesca", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Tè al limone", price: 3, time: 1, category: drinkCategory.Analcolico, available: true },
        { name: "Vino rosso", price: 4, time: 2, category: drinkCategory.Alcolico, available: true }
    ];


    orderService.deleteAll().then(() => {
        //console.log("Ordini eliminati");
    });
    suborderService.deleteAll().then(() => {
        //console.log("Suborders eliminati");
    });
    userService.deleteAll().then(() => {
        users.forEach(user => {
            //console.log("Inserisco: " + user.username + " role: " + user.role);
            userService.create(user)
        });
    })
    tableService.deleteAll().then(() => {
        tables.forEach(table => {
            //console.log("Inserisco tavolo nr.: " + table.table_number + " posti: " + table.total_seats);
            tableService.create(table);
        });
    });
    foodService.deleteAll().then(() => {
        foods.forEach(food => {
            //console.log("Inserisco cibo: " + food.name + " prezzo: " + food.price);
            foodService.create(food);
        });
    });
    drinkService.deleteAll().then(() => {
        drinks.forEach(drink => {
            //console.log("Inserisco bibita: " + drink.name + " prezzo: " + drink.price);
            drinkService.create(drink);
        });
    });


}