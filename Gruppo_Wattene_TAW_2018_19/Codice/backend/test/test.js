/* eslint-disable no-undef */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// const mongoose = require("mongoose");
var userModel = require('../dist/models/user.model');
var drinkModel = require('../dist/models/drink.model');
var tableModel = require('../dist/models/table.model');
var orderModel = require('../dist/models/order.model');
var foodModel = require('../dist/models/food.model');

const chaiHttp = require('chai-http');
const server = require('../dist/index');
const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

const usr = "testing";
const psw = "testing";
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDk1ZWE4NTQyNjkyNDE1OTA2YTcyZjgiLCJyb2xlIjoiY2Fzc2EiLCJpYXQiOjE1NzAyNTU4ODN9.i9mXNo1XcB3cMtCVlIaRXxCtt9HjQyIXdXWDGUQBZjM";

//User creation and login TEST



//Master Test
describe('Testing API', () => {
  before((done) => { //Before testing we log in as admins(cassa in our case)
    chai.request(server)
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        'username': usr,
        'password': psw
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.should.have.header('Content-Type', 'application/json; charset=utf-8');
        res.should.be.json;
        token = res.body.token; //aggiorna il token con quello appena ricevuto
        done();
      })
  });

  /*
  * Test the /drinks route (complete)
  */
  describe('/drinks', () => {

    //pulisce database per evitare errori
    beforeEach((done) => {
      drinkModel.default.deleteMany({}, () => {
        done();
      });
    });

    //GET
    describe('.GET', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/drinks')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      //base get
      it('it should GET all the drinks', (done) => {
        chai.request(server)
          .get('/drinks')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.have.header('Content-Type', 'application/json; charset=utf-8');
            res.body.length.should.be.eql(0);
            done();
          });
      })
    })

    //POST
    describe('.POST', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .post('/drinks')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should not POST an incomplete new drink', (done) => {
        let drink = {
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          // category: "Analcolico",
          available: true
        }
        chai.request(server)
          .post('/drinks')
          .set('Authorization', `Bearer ${token}`)
          .send(drink)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Drinks validation failed: category: Path `category` is required.');
            done();
          })
      })

      it('it should POST a new drink', (done) => {
        let drink = {
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Analcolico",
          available: true
        }
        chai.request(server)
          .post('/drinks')
          .set('Authorization', `Bearer ${token}`)
          .send(drink)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('message').eql('Drink successfully added!');
            // res.body.should.have.property('name');
            // res.body.should.have.property('price');
            // res.body.should.have.property('time');
            // res.body.should.have.property('category');
            // res.body.should.have.property('available');
            done();
          })
      })
    })

    //GETBYID
    describe('.GET/:ID', () => {

      var drink;
      //aggiunge al volo un libro al database
      beforeEach((done) => {
        drink = new drinkModel.default({
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Analcolico",
          available: true
        })
        drink.save((err, drink) => { this.drink = drink });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/drinks/' + drink.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should GET a drink by the given id', (done) => {
        chai.request(server)
          .get('/drinks/' + drink.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(drink)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('price');
            res.body.should.have.property('time');
            res.body.should.have.property('category');
            res.body.should.have.property('available');
            res.body.should.have.property('_id').eql(drink.id);
            done();
          })
      })

    })

    //PUTBYID
    describe('.PUT/:ID', () => {

      var drink;
      //aggiunge al volo un drink al database
      beforeEach((done) => {
        drink = new drinkModel.default({
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Analcolico",
          available: true
        })
        drink.save((err, drink) => { this.drink = drink });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .put('/drinks/' + drink.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should UPDATE a drink given the id', (done) => {
        chai.request(server)
          .put('/drinks/' + drink.id)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: "Tavernello della Spak",
            price: 13,
            time: 2,
            category: "Alcolico", //proprieta cambiata da analcolico
            available: true
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('category').eql("Alcolico");
            done();
          })
      })

    })

    //REMOVEBYID
    describe('.DELETE/:ID', () => {

      var drink;
      //aggiunge al volo un libro al database
      beforeEach((done) => {
        drink = new drinkModel.default({
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Analcolico",
          available: true
        })
        drink.save((err, drink) => { this.drink = drink });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .delete('/drinks/' + drink.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should DELETE a drink given the id', (done) => {
        chai.request(server)
          .delete('/drinks/' + drink.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(drink)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
      })

    })

  });

  /*
  * Test the /foods route (complete)
  */
  describe('/foods', () => {

    //pulisce database per evitare errori
    beforeEach((done) => {
      foodModel.default.deleteMany({}, () => {
        done();
      });
    });

    //GET
    describe('.GET', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/foods')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      //base get
      it('it should GET all the foods', (done) => {
        chai.request(server)
          .get('/foods')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.have.header('Content-Type', 'application/json; charset=utf-8');
            res.body.length.should.be.eql(0);
            done();
          });
      })
    })

    //POST
    describe('.POST', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .post('/foods')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should not POST an incomplete new food', (done) => {
        let food = {
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          // category: "Analcolico",
          available: true
        }
        chai.request(server)
          .post('/foods')
          .set('Authorization', `Bearer ${token}`)
          .send(food)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Food validation failed: category: Path `category` is required.');
            done();
          })
      })

      it('it should POST a new food', (done) => {
        let food = {
          name: "Prosciutto crudo arrosto",
          price: 13,
          time: 2,
          category: "Primo Piatto",
          available: true
        }
        chai.request(server)
          .post('/foods')
          .set('Authorization', `Bearer ${token}`)
          .send(food)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('message').eql('Food successfully added!');
            // res.body.should.have.property('name');
            // res.body.should.have.property('price');
            // res.body.should.have.property('time');
            // res.body.should.have.property('category');
            // res.body.should.have.property('available');
            done();
          })
      })
    })

    //GETBYID
    describe('.GET/:ID', () => {

      var food;
      //aggiunge al volo un cibo al database
      beforeEach((done) => {
        food = new foodModel.default({
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Primo Piatto",
          available: true
        })
        food.save((err, food) => { this.food = food });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/foods/' + food.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should GET a food by the given id', (done) => {
        chai.request(server)
          .get('/foods/' + food.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(food)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('price');
            res.body.should.have.property('time');
            res.body.should.have.property('category');
            res.body.should.have.property('available');
            res.body.should.have.property('_id').eql(food.id);
            done();
          })
      })

    })

    //PUTBYID
    describe('.PUT/:ID', () => {

      var food;
      //aggiunge al volo un food al database
      beforeEach((done) => {
        food = new foodModel.default({
          name: "Pasta al Tonno",
          price: 6,
          time: 2,
          category: "Primo Piatto",
          available: true
        })
        food.save((err, food) => { this.food = food });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .put('/foods/' + food.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should UPDATE a food given the id', (done) => {
        chai.request(server)
          .put('/foods/' + food.id)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: "Pasta al Tonno",
            price: 6,
            time: 2,
            category: "Secondo Piatto", //proprieta cambiata da primo piatto
            available: true
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('category').eql("Secondo Piatto");
            done();
          })
      })

    })

    //REMOVEBYID
    describe('.DELETE/:ID', () => {

      var food;
      //aggiunge al volo un libro al database
      beforeEach((done) => {
        food = new drinkModel.default({
          name: "Tavernello della Spak",
          price: 13,
          time: 2,
          category: "Primo Piatto",
          available: true
        })
        food.save((err, food) => { this.food = food });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .delete('/foods/' + food.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should DELETE a food given the id', (done) => {
        chai.request(server)
          .delete('/foods/' + food.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(food)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
      })

    })

  });

  /*
  * Test the /order route (update)
  */
  describe('/orders', () => {

    //pulisce database per evitare errori
    beforeEach((done) => {
      orderModel.default.deleteMany({}, () => {
        done();
      });
    });

    //GET
    describe('.GET', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/orders')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      //base get
      it('it should GET all the orders', (done) => {
        chai.request(server)
          .get('/orders')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.have.header('Content-Type', 'application/json; charset=utf-8');
            res.body.length.should.be.eql(0);
            done();
          });
      })
    })

    //POST
    describe('.POST', () => {

      beforeEach((done) => {
        waiter = new userModel.default({
          username: "Marcello",
          hash: "$2a$10$T6h0/tWXvZzh33lwQJloLeaYI.x3a8/.U2ek1RtjEyu3pItXZljRO",
          firstname: "CheTavevodetto",
          lastname: "Tomma",
          role: "cameriere"
        })
        waiter.save((err, waiter) => { this.waiter = waiter });

        table = new tableModel.default({
          waiter_id: waiter.id,
          table_number: 69,
          available: false,
          total_seats: 5,
          clients: 4
        })
        table.save((err, table) => { this.table = table });

        food = new foodModel.default({
          name: "Pasta al Goran",
          price: 13,
          time: 6,
          category: "Primo Piatto",
          available: true,
        })
        food.save((err, food) => { this.food = food });

        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .post('/orders')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })
      //TODO: fixare questa cosa creando waiter e table e food da aggiungere al volo al database
      it('it should not POST an incomplete new order', (done) => {
        let order = {
          waiter_id: waiter.id,
          //table_id: table.id,
          ordered_foods: [{
            food_id: food.id,
            price: food.price,
            ordered_q: 1,
            ready: false,
          }],
          ordered_drinks: [],
          clients: 5
        }
        chai.request(server)
          .post('/orders')
          .set('Authorization', `Bearer ${token}`)
          .send(order)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('table_id missing');
            done();
          })
      })

      it('it should POST a new order', (done) => {
        let order = {
          table_id: table.id,
          ordered_foods: [{
            food_id: food.id,
            ordered_q: 1
          }],
          clients: table.clients
        }
        chai.request(server)
          .post('/orders')
          .set('Authorization', `Bearer ${token}`)
          .send(order)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('message').eql('Order successfully added!');
            // res.body.should.have.property('name');
            // res.body.should.have.property('price');
            // res.body.should.have.property('time');
            // res.body.should.have.property('category');
            // res.body.should.have.property('available');
            done();
          })
      })
    })

    //GETBYID
    describe('.GET/:ID', () => {

      var order;
      //aggiunge al volo un ordine al database
      beforeEach((done) => {
        waiter = new userModel.default({
          username: "Marcello",
          hash: "jhgjgj",
          firstname: "CheTavevodetto",
          lastname: "Tomma",
          role: "cameriere"
        })
        waiter.save((err, waiter) => { this.waiter = waiter });

        table = new tableModel.default({
          waiter_id: waiter.id,
          table_number: 69,
          available: false,
          total_seats: 5,
          clients: 4
        })
        table.save((err, table) => { this.table = table });

        order = new orderModel.default({
          waiter_id: waiter.id,
          table_id: table.id,
          ordered_foods: [],
          ordered_drinks: [],
          clients: 5
        })
        order.save((err, order) => { this.order = order });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/orders/' + order.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should GET a order by the given id', (done) => {
        chai.request(server)
          .get('/orders/' + order.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(order)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('name');
            // res.body.should.have.property('price');
            // res.body.should.have.property('time');
            // res.body.should.have.property('category');
            // res.body.should.have.property('available');
            res.body.should.have.property('_id').eql(order.id);
            done();
          })
      })

    })

    //PUTBYID
    describe('.PUT/:ID', () => {

      var order;
      var waiter;
      var table;
      //aggiunge al volo un libro al database
      beforeEach((done) => {
        waiter = new userModel.default({
          username: "Marcello",
          hash: "jhgjgj",
          firstname: "CheTavevodetto",
          lastname: "Tomma",
          role: "cameriere"
        })
        waiter.save((err, waiter) => { this.waiter = waiter });

        table = new tableModel.default({
          waiter_id: waiter.id,
          table_number: 69,
          available: false,
          total_seats: 6,
          clients: 5
        })
        table.save((err, table) => { this.table = table });

        order = new orderModel.default({
          waiter_id: waiter.id,
          table_id: table.id,
          ordered_foods: [],
          ordered_drinks: [],
          clients: 5
        })
        order.save((err, order) => { this.order = order });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .put('/orders/' + order.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should UPDATE a order given the id', (done) => {
        chai.request(server)
          .put('/orders/' + order.id)
          .set('Authorization', `Bearer ${token}`)
          .send({
            waiter_id: waiter.id,
            table_id: table.id,
            ordered_foods: [],
            ordered_drinks: [],
            clients: 4 //elemento cambiato
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('clients').eql("4");
            done();
          })
      })

    })

    //REMOVEBYID
    describe('.DELETE/:ID', () => {

      var order;
      //aggiunge al volo un libro al database
      beforeEach((done) => {
        order = new drinkModel.default({
          waiter_id: "",
          table_id: "",
          ordered_foods: {},
          ordered_drinks: {},
          clients: 5
        })
        order.save((err, order) => { this.order = order });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .delete('/orders/' + order.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should DELETE a order given the id', (done) => {
        chai.request(server)
          .delete('/orders/' + order.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(order)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
      })

    })

  });

  /*
  * Test the /table route (recheck)
  */
  describe('/tables', () => {

    //pulisce database per evitare errori
    beforeEach((done) => {
      tableModel.default.deleteMany({}, () => {
        done();
      });
    });

    //GET
    describe('.GET', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/tables')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      //base get
      it('it should GET all the tables', (done) => {
        chai.request(server)
          .get('/tables')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.have.header('Content-Type', 'application/json; charset=utf-8');
            res.body.length.should.be.eql(0);
            done();
          });
      })

      //base get w/ seats required
      it('it should GET all the tables with enough space', (done) => {
        chai.request(server)
          .get('/tables?total_seats=4')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.should.have.header('Content-Type', 'application/json; charset=utf-8');
            res.body.length.should.be.eql(0);
            done();
          });
      })

      //base get w/ seats required
      it('it should not GET with wrong query', (done) => {
        -      chai.request(server)
          .get('/tables?total_seats=ciao')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      })
    })

    //POST
    describe('.POST', () => {

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .post('/tables')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should not POST an incomplete new table', (done) => {
        let table = {
          table_number: 1,
          available: true,
          // total_seats: 5, 
          clients: 0
        }
        chai.request(server)
          .post('/tables')
          .set('Authorization', `Bearer ${token}`)
          .send(table)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Table validation failed: total_seats: Path `total_seats` is required.');
            done();
          })
      })

      it('it should POST a new table', (done) => {
        waiter = new userModel.default({
          username: "Marcello",
          hash: "jhgjgj",
          firstname: "CheTavevodetto",
          lastname: "Tomma",
          role: "cameriere"
        })
        waiter.save((err, waiter) => { this.waiter = waiter });

        let table = {
          waiter_id: waiter.id,
          table_number: 1,
          available: true,
          total_seats: 5,
          clients: 0
        }
        chai.request(server)
          .post('/tables')
          .set('Authorization', `Bearer ${token}`)
          .send(table)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('message').eql('Table successfully added!');
            // res.body.should.have.property('name');
            // res.body.should.have.property('price');
            // res.body.should.have.property('time');
            // res.body.should.have.property('category');
            // res.body.should.have.property('available');
            done();
          })
      })
    })

    //GETBYID
    describe('.GET/:ID', () => {

      var table;
      //aggiunge al volo un table al database
      beforeEach((done) => {
        table = new tableModel.default({
          table_number: 1,
          available: true,
          total_seats: 5,
          clients: 0
        })
        table.save((err, table) => { this.table = table });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/tables/' + table.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should GET a table by the given id', (done) => {
        chai.request(server)
          .get('/tables/' + table.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(table)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('table_number');
            res.body.should.have.property('available');
            res.body.should.have.property('total_seats');
            res.body.should.have.property('clients');
            res.body.should.have.property('_id').eql(table.id);
            done();
          })
      })

    })

    //PUTBYID
    describe('.PUT/:ID', () => {

      var table;
      //aggiunge al volo un table al database
      beforeEach((done) => {
        table = new tableModel.default({
          table_number: 1,
          available: true,
          total_seats: 5,
          clients: 0
        })
        table.save((err, table) => { this.table = table });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .put('/tables/' + table.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should UPDATE a table given the id', (done) => {
        chai.request(server)
          .put('/tables/' + table.id)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: "Tavernello della Spak",
            price: 13,
            time: 2,
            category: "Secondo Piatto", //proprieta cambiata da primo piatto
            available: true
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.have.property('category').eql("Secondo Piatto");
            done();
          })
      })

    })

    //REMOVEBYID
    describe('.DELETE/:ID', () => {

      var table;
      //aggiunge al volo un table al database
      beforeEach((done) => {
        table = new tableModel.default({
          table_number: 1,
          available: true,
          total_seats: 5,
          clients: 0
        })
        table.save((err, table) => { this.table = table });
        done();
      })

      //authtest
      it('it should require auth', (done) => {
        chai.request(server)
          .delete('/tables/' + table.id)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })

      it('it should DELETE a table given the id', (done) => {
        chai.request(server)
          .delete('/tables/' + table.id)
          .set('Authorization', `Bearer ${token}`)
          // .send(table)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
      })

    })

  });



  /*
  * Test the /users route (finish)
  */
  describe('/users', () => {
    describe('/GET users', () => {
      it('it should require auth', (done) => {
        chai.request(server)
          .get('/users')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql({ message: 'Invalid Token' });
            done();
          });
      })
      it('it should GET all the users', (done) => {
        chai.request(server)
          .get('/users')
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });
    });

    describe('/GET current user', () => {
      it('it should GET the current user', (done) => {
        chai.request(server)
          .get('/users/current')
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });





  //end di master
});
