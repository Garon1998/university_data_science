import express = require('express');
import DrinkService from '../services/drink.service';
const authorize = require('../_helpers/authorize');
import { ROLE } from '../_helpers/enum';
import utility from '../_helpers/utility';
import ios from '../index';

class DrinkController {
  public router = express.Router();
  public drinkService = new DrinkService();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // All authorized users
    this.router.get(
      '/',
      this.getAll
    );
    // All authorized users
    this.router.get(
      '/categories',
      this.getCategories
    );
    // All authorized users
    this.router.get(
      '/:id',
      this.getById
    );
    // Admins only
    this.router.post(
      '/',
      authorize([ROLE.cassa]), this.create
    );
    // Admins only
    this.router.put(
      '/:id',
      authorize([ROLE.cassa]),
      this.update
    );
    // Admins only
    this.router.delete(
      '/:id',
      authorize([ROLE.cassa]),
      this.delete
    );
  }

  public getAll = async (req, res, next) => {
    this.drinkService.getAll()
      .then(drink => drink ? res.json(drink) : res.sendStatus(404))
      .catch(err => utility.errorHandler(res, next, err));
  }
  public getById = async (req, res, next) => {
    this.drinkService.getById(req.params.id)
      .then(drink => drink ? res.json(drink) : res.sendStatus(404))
      .catch(err => utility.errorHandler(res, next, err));
  }

  public create = async (req, res, next) => {
    this.drinkService
      .create(req.body)
      .then(drink => {
        ios.emit("modified_drink", drink);
        res.json(drink).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  }
  public getCategories = async (req, res, next) => {
    this.drinkService.getCategories()
      .then(categories => res.json(categories))
      .catch(err => utility.errorHandler(res, next, err));
  }

  public update = async (req, res, next) => {
    this.drinkService
      .update(req.params.id, req.body)
      .then(drink => {
        ios.emit("modified_drink", drink);
        res.json(drink).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  }

  public delete = async (req, res, next) => {
    this.drinkService
      .delete(req.params.id)
      .then(drink => {
        ios.emit("modified_drink", drink);
        res.json({}).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  }

}

export default DrinkController;


