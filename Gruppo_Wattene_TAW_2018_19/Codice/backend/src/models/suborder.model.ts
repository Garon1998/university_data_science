/*
    Definizione dello schema per i sotto ordini.
*/
import * as mongoose from 'mongoose';
import { FoodAndDrinkState, suborderstate } from '../_helpers/enum';
var config = require('../../src/config.json');
var Schema = mongoose.Schema;
export interface ISubOrder extends mongoose.Document {
    readonly id: mongoose.Schema.Types.ObjectId,
    order_id: mongoose.Schema.Types.ObjectId,
    ordered_foods?: {
        food_id: mongoose.Schema.Types.ObjectId,
        quantity: number,
        time: number,
        name: string,
        price: number,
        prepared_by: mongoose.Schema.Types.ObjectId
    }[],
    ordered_drinks?: {
        drink_id: mongoose.Schema.Types.ObjectId,
        quantity: number,
        time: number,
        name: string,
        price: number,
        prepared_by: mongoose.Schema.Types.ObjectId
    }[],
    state_foods: string,
    state_drinks: string
}

export const orderedFoodSchema = new Schema({
    food_id: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    time:{
        type: Number,
        min:0
    },
    name: {
        type: String
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    prepared_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});
export const orderedDrinkSchema = new Schema({
    drink_id: {
        type: Schema.Types.ObjectId,
        ref: 'Drink'
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    time: {
        type: Number,
        min: 0
    },
    name: {
        type: String
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    prepared_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

export const subOrderSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    ordered_foods: {
        type: [orderedFoodSchema],
        default: []
    },
    ordered_drinks: {
        type: [orderedDrinkSchema],
        default: []
    },
    state_foods: {
        type: String,
        required: true,
        enum: FoodAndDrinkState,
        default: suborderstate.incoda
    },
    state_drinks: {
        type: String,
        required: true,
        enum: FoodAndDrinkState,
        default: suborderstate.incoda
    }
},
{
    timestamps: true
});

//export default mongoose.model<IFood>('Food', foodSchema);

const subOrderModel = mongoose.model<ISubOrder & mongoose.Document>('SubOrder', subOrderSchema);

export default subOrderModel;