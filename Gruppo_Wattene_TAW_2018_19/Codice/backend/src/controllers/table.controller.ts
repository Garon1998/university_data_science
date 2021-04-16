import express = require("express");
import TableService from "../services/table.service";
const authorize = require("../_helpers/authorize");
import { ROLE } from "../_helpers/enum";
import utility from "../_helpers/utility";
import ios from "../index";

class TableController {
  public router = express.Router();
  public tableService = new TableService();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // All authorized users
    this.router.get(
      "/",
      this.getAll
    );

    // All authorized users
    this.router.get(
      "/:id",
      this.getById
    );

    // Adimins only
    this.router.post(
      "/",
      authorize([ROLE.cassa]),
      this.create
    );

    // Adimins and waiters only
    this.router.put(
      "/:id",
      authorize([ROLE.cassa, ROLE.cameriere]),
      this.update
    );

    // Adimins only
    this.router.delete(
      "/:id",
      authorize([ROLE.cassa]),
      this.delete
    );
  }


  public getAll = async (req, res, next) => {
    if (req.query.waiter) {
      this.tableService
        .getAllWWaiterFilter(req.query.waiter)
        .then(table => (table ? res.json(table) : res.sendStatus(404)))
        .catch(err => utility.errorHandler(res, next, err));
    } else {
      this.tableService
        .getAll()
        .then(table => (table ? res.json(table) : res.sendStatus(404)))
        .catch(err => utility.errorHandler(res, next, err));
    }
  };
  public getById = async (req, res, next) => {
    this.tableService
      .getById(req.params.id)
      .then(table => (table ? res.json(table) : res.sendStatus(404)))
      .catch(err => utility.errorHandler(res, next, err));
  };

  //solo la cassa può effettuare questa operazione
  public create = async (req, res, next) => {
    this.tableService
      .create(req.body)
      .then(table => {
        ios.emit("modified_table", table);
        res.json(table).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };

  // Admins and waiters only
  // HttpPut tables/:table_id
  public update = async (req, res, next) => {
    const role = req.user.sub;
    this.tableService
      .update(req.params.id, req.body, role)
      .then(table => {
        ios.emit("modified_table", table);
        res.json(table).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };

  // Admins only
  public delete = async (req, res, next) => {
    this.tableService
      .delete(req.params.id)
      .then(table => {
        ios.emit("modified_table", table);
        res.json(table).send({});
      })
      .catch(err => res.status(500).json(err));
  };
}

export default TableController;
