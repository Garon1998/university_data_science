/*
    Definizione dello schema per gli ordini.
*/
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
    readonly id: mongoose.Schema.Types.ObjectId,
    waiter_id: mongoose.Schema.Types.ObjectId,
    table_id: mongoose.Schema.Types.ObjectId,
    paid: boolean,
    served: boolean,
    amount: number,
    clients: Number
}
export const orderSchema = new Schema({
    waiter_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    table_id: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    clients: {
        // Il numero di clienti è salvato anche in questo document per tenere uno storico
        type: Number,
        required: true,
        min: 1
    },
    paid: {
        type: Boolean,
        default: false
    },
    served: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: 0,
        min: 0
    }
},
    {
        timestamps: true
    });
const orderModel = mongoose.model<IOrder & mongoose.Document>('Order', orderSchema);
export default orderModel;