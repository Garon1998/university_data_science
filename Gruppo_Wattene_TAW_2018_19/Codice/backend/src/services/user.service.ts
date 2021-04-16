import userModel from '../models/user.model';
import utility from '../_helpers/utility';
import * as mongoose from 'mongoose';
require('dotenv').config();
const { suborderstate, ROLE } = require('../_helpers/enum');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const TokenExpire = "1d";
const RefreshTokenEpire = "5d";
class TableService {
    public User = userModel;

    private generateHash(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    private generateToken(tokendata) {
        return jwt.sign(
            tokendata,
            process.env.TOKEN_SECRET,
            { expiresIn: TokenExpire});
    }
    private generateRefreshToken(tokendata) {
        return jwt.sign(
            tokendata,
            process.env.TOKEN_SECRET,
            { expiresIn: RefreshTokenEpire });
    }


    public refreshToken = async (body) => {
        utility.checkAndThrow(body, "refresh_token");
        utility.checkAndThrow(body, "user_id");
        const user = await this.User.findById(body.user_id);
        if(!user) throw "User doesn't exists";
        var refresh_token = user.refresh_token;
        var token = null;
        if (refresh_token === body.refresh_token) {
            var tokendata = {
                sub: user.id,
                role: user.role
            };
            token = this.generateToken(tokendata);
            refresh_token = this.generateRefreshToken(tokendata);
            user.refresh_token = refresh_token;
            await user.save();
            return {
                token,
                refresh_token
            };
        }

    }

    //login
    public authenticate = async({ username, password }) => {
        const user = await this.User.findOne({ username });
        if (user && user.delation_date == null && bcrypt.compareSync(password, user.hash)) {
            var { hash, ...userWithoutHash } = user.toObject();
            var tokendata = {
                sub: user.id,
                role: user.role
            };
            const token = this.generateToken(tokendata);
            const refresh_token = this.generateRefreshToken(tokendata);
            user.refresh_token = refresh_token;
            await user.save();
           

            return {
                ...userWithoutHash,
                token,
                refresh_token
            };
        }
    }
    public getAll = async() => {
        return await this.User.find().select('-hash');
    }

    public getById = async (id) =>{
        return await this.User.findById(id).select('-hash');
    }

    //register
    public create = async(userParam) => {
        // validate
        if (await this.User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
    
        var user = new this.User(userParam);
    
        // hash password
        if (userParam.password) {
            user.hash = this.generateHash(userParam.password);
        }
        user.refresh_token = null;
        user.delation_date = null
    
        // save user
        await user.save();
        return user;
    }

    public update = async (id: mongoose.Schema.Types.ObjectId, userParams) => {
        var user = await this.User.findById(id);
    
        // validate
        if (!user) throw 'User not found';

        // username non modificabile
        if (utility.checkProperty(userParams, "username") && user.username != userParams.username)
            throw 405; // Username è read-only

    
        // hash della password se presente nei parametri
        if (utility.checkProperty(userParams, "password")) {
            userParams.hash = this.generateHash(userParams.password);
        }
    
        delete userParams.delation_date;
        delete userParams.refresh_token;
        // copia userParams nelle proprietà dell'utente
        Object.assign(user, userParams);
    
        await user.save();
    }
    public delete = async (id: mongoose.Schema.Types.ObjectId) => {
        //delete user
        var user = await this.getById(id);
        user.delation_date = new Date();
        await user.save();
        return user;
    }
    public deleteAll = async() => {
        return await this.User.deleteMany({});
    }
}
export default TableService;