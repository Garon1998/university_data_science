/*
    Definizione dello schema per i tavoli.
*/
import * as mongoose from 'mongoose';
const config = require('../../src/config.json');
const Schema = mongoose.Schema;
export interface ITable extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    waiter_id: mongoose.Schema.Types.ObjectId,
    order_id: mongoose.Schema.Types.ObjectId,
    table_number: number,
    available: boolean,
    total_seats: number,
    clients: number
}

const tableSchema = new Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    total_seats: {
        type: Number,
        required: true,
        min: 1
    },
    clients: {
        type: Number,
        default: 0,
        min: 0,
        max: this.total_seats
    },
    waiter_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    order_id:{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    }
});

var tableModel = mongoose.model<ITable & mongoose.Document>('Table', tableSchema);

export default tableModel;