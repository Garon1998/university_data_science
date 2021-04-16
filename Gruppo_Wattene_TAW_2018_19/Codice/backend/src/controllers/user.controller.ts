import express = require("express");
import UserService from "../services/user.service";
import utility from "../_helpers/utility";
import ios from "../index";
const authorize = require("../_helpers/authorize");
import { ROLE } from "../_helpers/enum";

class UserController {
  public router = express.Router();
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // routes
    this.router.post(
      '/login',
      this.authenticate
    );
    this.router.post(
      '/refresh',
      this.refreshToken
    );
    this.router.post(
      '/',
      authorize(ROLE.cassa),
      this.register
    ); //admins only
    this.router.get(
      '/',
      authorize(ROLE.cassa),
      this.getAll)
      ; //admins only
    this.router.get(
      '/current',
      this.getCurrent
    );
    this.router.get(
      '/:id',
      authorize(ROLE.cassa),
      this.getById
    ); //admins only
    this.router.put(
      '/:id',
      authorize(ROLE.cassa),
      this.update);
    this.router.delete(
      '/:id',
      authorize(ROLE.cassa),
      this.delete
    ); //admins only
  }


  public authenticate = async (req, res, next) => {
    this.userService
      .authenticate(req.body)
      .then(user =>
        user
          ? res.json(user)
          : res
            .status(400)
            .json({ message: "Username or password is incorrect" })
      )
      .catch(err => utility.errorHandler(res, next, err));
  };

  public register = async (req, res, next) => {
    this.userService
      .create(req.body)
      .then(user => {
        ios.emit("modified_user", user);
        res.json(user).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };
  public refreshToken = async (req, res, next) => {
    this.userService
      .refreshToken(req.body)
      .then(user =>
        user
          ? res.json(user)
          : res.status(400).json({ message: "Error on refreshing token" })
      )
      .catch(err => utility.errorHandler(res, next, err));
  };

  public getAll = async (req, res, next) => {
    this.userService
      .getAll()
      .then(users => res.json(users))
      .catch(err => utility.errorHandler(res, next, err));
  };

  public getCurrent = async (req, res, next) => {
    this.userService
      .getById(req.user.sub)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
      .catch(err => utility.errorHandler(res, next, err));
  };
  public getById = async (req, res, next) => {
    this.userService
      .getById(req.params.id)
      .then(user => (user ? res.json(user) : res.sendStatus(404)))
      .catch(err => utility.errorHandler(res, next, err));
  };

  public update = async (req, res, next) => {
    const currentUser = req.user;
    const id = req.params.id;

    // Solo la cassa può modificare altri utenti
    if (id !== currentUser.sub && currentUser.role !== ROLE.cassa) {
      return res.status(403).json({ message: "Forbidden" });
    }

    this.userService
      .update(req.params.id, req.body)
      .then(user => {
        ios.emit("modified_user", user);
        res.json(user).send();
      })
      .catch(err => utility.errorHandler(res, next, err));
  };

  public delete = async (req, res, next) => {
    this.userService
      .delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => utility.errorHandler(res, next, err));
  };
}

export default UserController;
