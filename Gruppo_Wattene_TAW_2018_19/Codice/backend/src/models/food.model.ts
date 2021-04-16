
/*
    Definizione dello schema per i cibi.
*/
import * as mongoose from 'mongoose';
const config = require('../../src/config.json');
const Schema = mongoose.Schema;

export interface IFood extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    name: string,
    price: number,
    time: number,
    category: string,
    available: boolean,
}

const foodSchema = new Schema({
    name: {
        type: String,
        minlength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    time: { type: Number, required: true, min: 0 },
    category: {
        type: String,
        required: true,
        enum: config.foodcategory
    },
    available: { type: Boolean, default: true },
});

foodSchema.methods.setAvailability = function (status:boolean){
    this.available = status;
}

foodSchema.methods.isAvailable = function (){
    return this.available;
}

const foodModel = mongoose.model<IFood & mongoose.Document>('Food', foodSchema);

export default foodModel;