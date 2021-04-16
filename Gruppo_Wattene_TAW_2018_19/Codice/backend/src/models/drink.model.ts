/*
    Definizione dello schema per i drinks.
*/

import * as mongoose from 'mongoose';
var config = require('../../src/config.json');
var Schema = mongoose.Schema;

export interface IDrink extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    name: string,
    price: number,
    time: number,
    category: string,
    available: boolean,
}

const drinkSchema = new Schema({
    name: {
        type: String,
        minlength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    time: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: config.drinkcategory
    },
    available: { type: Boolean, required: true },
});

const drinkModel = mongoose.model<IDrink & mongoose.Document>('Drinks', drinkSchema);

export default drinkModel;