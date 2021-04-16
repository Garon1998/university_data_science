const config = require('../../src/config.json');
import drinkModel from '../models/drink.model';
import * as mongoose from 'mongoose';
class DrinkService {
    public drink = drinkModel;
    
    public getAll = async () => {
        return await this.drink.find().sort({ name: 1 });
    }

    public async getById(id: mongoose.Schema.Types.ObjectId) {
        return await this.drink.findById(id);
    }

    public async create(drinkParams) {
        // validate

        if (await this.drink.findOne({ name: drinkParams.name })) {
            throw 'Name "' + drinkParams.name + '" is already taken';
        }

        var drink = new this.drink(drinkParams);

        // save drink
        await drink.save();
        return drink;
    }

    public async update(id: mongoose.Schema.Types.ObjectId, drinkParams) {
        var drink = await this.drink.findById(id);

        // validate
        if (!drink) throw 'Drink not found';
        if (drink.name !== drinkParams.name && await this.drink.findOne({ name: drinkParams.name })) {
            throw 'Name "' + drinkParams.name + '" is already taken';
        }

        // copy drinkParam properties to drink
        Object.assign(drink, drinkParams);

        await drink.save();
        return drink;
    }

    public async delete(id: mongoose.Schema.Types.ObjectId) {
        await this.drink.findByIdAndRemove(id);
    }
    public deleteAll() {
        return this.drink.deleteMany({});
    }

    public async getCategories() {
        return await this.drink.distinct("category");
    }
}
export default DrinkService;