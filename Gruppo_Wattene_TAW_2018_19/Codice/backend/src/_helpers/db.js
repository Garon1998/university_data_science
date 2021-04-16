/*
    Punto di accesso unico per il database. Esporta vari oggetti per ogni parte del database
*/
require('dotenv').config();
var config = require('../../src/config.json');
const mongoose = require('mongoose');

//helper per inizializzare il database
const dbinit = require('./db-init');

//vari mongo models importati
const userModel = require('../models/user.model');
const drinkModel = require('../models/drink.model');
const tableModel = require('../models/table.model');
const orderModel = require('../models/suborder.model');
const foodModel = require('../models/food.model');

//esporta i model delle varie risorse
module.exports = {
    User: userModel,
    Table: tableModel,
    Drink: drinkModel,
    Food: foodModel,
    Order: orderModel
};


//connette al database e lo inizializza
var connectionString;
if (process.env.REMOTE_SERVER == "true")
    connectionString = process.env.DB_CONNECT_REMOTE;
else
    connectionString = process.env.DB_CONNECT_LOCAL;

mongoose.connect(connectionString, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(
    function onconnected() {
        console.log("Connected to MongoDB");
        //inizializzazione del database (non eseguita una volta deployato il server e durante i test automatici)
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== 'heroku') {
            dbinit();
            console.log("Inizializzato il database");
        }
    });

mongoose.Promise = global.Promise;