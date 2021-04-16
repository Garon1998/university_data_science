import express = require("express");
import FoodService from "../services/food.service";
import utility from "../_helpers/utility";
const authorize = require("../_helpers/authorize");
import { ROLE } from "../_helpers/enum";
import ios from "../index";

class FoodController {
  public router = express.Router();
  public foodService = new FoodService();

  constructor() {
    this.initializeRoutes();
  }
  // routes
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
      authorize([ROLE.cassa]),
      this.create
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
    this.foodService
      .getAll()
      .then(food => (food ? res.json(food) : res.sendStatus(404)))
      .catch(err => utility.errorHandler(res, next, err));
  };
  public getById = async (req, res, next) => {
    this.foodService
      .getById(req.params.id)
      .then(food => (food ? res.json(food) : res.sendStatus(404)))
      .catch(err => utility.errorHandler(res, next, err));
  };

  public create = async (req, res, next) => {
    this.foodService
      .create(req.body)
      .then(food => {
        ios.emit("modified_food", food);
        res.json(food).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };
  public getCategories = async (req, res, next) => {
    this.foodService
      .getCategories()
      .then(categories => res.json(categories))
      .catch(err => utility.errorHandler(res, next, err));
  };

  public update = async (req, res, next) => {
    this.foodService
      .update(req.params.id, req.body)
      .then(food => {
        ios.emit("modified_food", food);
        res.json(food).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };

  public delete = async (req, res, next) => {
    this.foodService
      .delete(req.params.id)
      .then(food => {
        ios.emit("modified_food", food);
        res.json({}).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };
}

export default FoodController;
