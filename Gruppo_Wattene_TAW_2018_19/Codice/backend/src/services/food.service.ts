// const config = require('../../src/config.json');
import fooodModel from '../models/food.model';

class FoodService {
    public food = fooodModel;

    public getAll = async () => {
        return await this.food.find().sort({ name: 1 });
    }
    public async getById(id) {
        return await this.food.findById(id);
    }

    public async create(foodParam) {
        if (await this.food.findOne({ name: foodParam.name }))
            throw 'Name "' + foodParam.name + '" is already taken';

        // TODO validare lunghezza stringa, prezzo > 0, tempo preparzione > 0
        const _food = new this.food(foodParam);

        // save food
        await _food.save();
        return _food;
    }


    //solo la cassa
    /*Validazione prezo >= 0 nel model */
    /*Validazione time >= 0 nel model */
    /*Validazione category valida nel model */
    public async update(id, foodParams) {
        let _food = await this.food.findById(id);
        // validate
        if (!_food) throw 'Food not found';

        // copy foodParams properties to food
        Object.assign(_food, foodParams);
        await _food.save();
        return _food;
    }

    public async delete(id) {
        await this.food.findByIdAndRemove(id);
    }
    public deleteAll(){
        return this.food.deleteMany({});
    }

    public async getCategories() {
        return await this.food.distinct("category");
    }
}
export default FoodService;