import tableModel from '../models/table.model';
import * as mongoose from 'mongoose';
import utility from '../_helpers/utility';
import { ROLE } from '../_helpers/enum';

class TableService {
    public tableModel = tableModel;

    public getAll = async () => {
        return await this.tableModel.find();
    }
    public getAllWSeatsFilter = async (seats:number) => {
        return await this.tableModel.find({ $and: [{ available: true }, { total_seats: { $gte: seats } }]});
    }

    //da spostare nell'endpoint utenti
    getAllWWaiterFilter = async (waiter: mongoose.Schema.Types.ObjectId) => {
        return await this.tableModel.find({ $and: [{ waiter_id: waiter }, { available: false }]});
    }
    public async getByTableNumber(number: number) {
        return await this.tableModel.findOne({table_number: number});
    }

    public async getById(id: mongoose.Schema.Types.ObjectId) {
        return await this.tableModel.findById(id);
    }

    //solo la cassa può effettuare questa operazione
    public async create(tableParams) {
        let table = await this.getByTableNumber(tableParams.table_number);
        if(table)
            throw "Table number is already taken";
        
        utility.checkAndThrow(tableParams, "total_seats");
        if (!Number.isInteger(tableParams.total_seats))
            throw utility.throwIntRequiredForProperty(tableParams.total_seats);
        if (tableParams.total_seats < 1)
            throw utility.throwMustBeGreaterOf("table seats ", 0);

        delete tableParams.waiter_id;
        delete tableParams.order_id;

        // salvo il tavolo
        let t = new this.tableModel(tableParams);
        await t.save();
        return t;
    }

    //Solo la cassa può fare questa operazione
    public async setTableWaiter(id: mongoose.Schema.Types.ObjectId, waiter_id: mongoose.Schema.Types.ObjectId) {
        let table = await this.getById(id);
        if (!table) throw 'Table not found';
        if(table.waiter_id != null)
            throw "Another waiter is serving this table";
        table.waiter_id = waiter_id;
        await table.save();
        return table;
    }


    //Cassa e camerieri
    public async update(id: mongoose.Schema.Types.ObjectId, tableParams, role: string) {
        let table = await this.getById(id);
        // validazione
        if (!table)
            utility.throwDocumentNotFound("Table")

        if (ROLE.cameriere === role) {
            delete tableParams["table_number"];
            delete tableParams["total_seats"];
        }
        let int_property = ["table_number","total_seats","clients"];
        for (let i = 0; i < int_property.length; i++)
            if (utility.hasProperty(tableParams, int_property[i]) && !Number.isInteger(tableParams[int_property[i]]))
                utility.throwIntRequiredForProperty(int_property[i]);


        // il tavolo viene liberato
        if (tableParams.available) {
            table.available = true;
            table.clients = 0;
            table.waiter_id = null;
            table.order_id = null;
        } else {
            if (utility.hasProperty(tableParams, "clients")) {
                if(!Number.isInteger(tableParams.clients))
                    utility.throwIntRequiredForProperty("clients")
                if (tableParams.clients < 0) {
                    utility.throwMustBeGreaterOf("clients", 0)
                }

                if (tableParams.clients > table.total_seats) {
                    utility.throwMustBeLowerOf("clients", "total seats");
                }
            }
        }

        Object.assign(table, tableParams);
        await table.save();
        return table;
    }

    public async delete(id: mongoose.Schema.Types.ObjectId) {
        var table = await this.getById(id);
        if(table.available)
            await table.remove();
        else throw "cannot delete table";
    }
    public deleteAll(){
        return this.tableModel.deleteMany({});
    }
}
export default TableService;