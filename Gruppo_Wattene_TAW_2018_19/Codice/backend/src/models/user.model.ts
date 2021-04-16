/*
    Definizione dello schema per gli utenti.
*/
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const config = require('../../src/config.json');

export interface IUser extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId,
    username: string
    hash: string,
    salt: string,
    firstname: string,
    lastname: string,
    role: string,
    delation_date: Date,
    refresh_token: string
}

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        minlength: 1
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1
    },
    role: {
        type: String,
        required: true,
        enum: config.userRole
    },
    delation_date:{
        type : Date,
        default: null
    },
    refresh_token: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});


const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;