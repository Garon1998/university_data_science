require('./_helpers/db');
import DrinkController from "./controllers/drink.controller";
import FoodController from "./controllers/food.controller";
import TableController from "./controllers/table.controller";
import OrderController from "./controllers/order.controller";
import UserController from "./controllers/user.controller";
import http = require('http');
import io from 'socket.io';

require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('./_helpers/jwt');
var errorHandler = require('./_helpers/error-handler');
var boolParser = require('express-query-boolean');

var ios = undefined;


// handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(boolParser());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
app.get("/", (req, res) => {
    res.status(200).json({
        api_version: "1",
        endpoints:
            [
                {
                    URL: 'users/',
                    endpoints: [{
                        RequestMethod: 'GET',
                        URL: '/'
                    },
                    {
                        RequestMethod: 'GET',
                        URL: '/current'
                    },
                    {
                        RequestMethod: 'GET',
                        URL: '/:id'
                    },
                    {
                        RequestMethod: 'POST',
                        URL: '/'
                    },
                    {
                        RequestMethod: 'POST',
                        URL: '/login'
                    },
                    {
                        RequestMethod: 'PUT',
                        URL: '/:id'
                    },
                    {
                        RequestMethod: 'DELETE',
                        URL: '/:id'
                    },
                    {
                        RequestMethod: 'POST',
                        URL: '/refresh'
                    }]
                },            
                {
                    URL: 'tables/',
                    endpoints: [
                        {
                            RequestMethod: 'GET',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'POST',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'DELETE',
                            URL: '/:id'
                        }
                    ]
                },    
                {
                    URL: 'foods/',
                    endpoints: [
                        {
                            RequestMethod: 'GET',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/categories'
                        },
                        {
                            RequestMethod: 'POST',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'DELETE',
                            URL: '/:id'
                        }
                    ]
                },
                {
                    URL: 'drinks/',
                    endpoints: [
                        {
                            RequestMethod: 'GET',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/categories'
                        },
                        {
                            RequestMethod: 'POST',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'DELETE',
                            URL: '/:id'
                        }
                    ]
                },
                {
                    URL: 'orders/',
                    endpoints: [
                        {
                            RequestMethod: 'GET',
                            URL: '/'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/:id/suborders'
                        },
                        {
                            RequestMethod: 'GET',
                            URL: '/suborders'
                        },
                        {
                            RequestMethod: 'POST',
                            URL: '/suborders'
                        },
                        {
                            RequestMethod: 'POST',
                            URL: '/:order_id/suborders'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:order_id/suborders/:suborder_id/foods/:food_id'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:order_id/suborders/:suborder_id/drinks/:drink_id'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:order_id/suborders/:suborder_id'
                        },
                        {
                            RequestMethod: 'PUT',
                            URL: '/:id'
                        },
                        {
                            RequestMethod: 'DELETE',
                            URL: '/:id'
                        }
                    ]
                }
            ]
    }
    )
})
// api routes
app.use('/drinks', new DrinkController().router);
app.use('/foods', new FoodController().router);
app.use('/tables', new TableController().router);
app.use('/orders', new OrderController().router);
app.use("/users", new UserController().router);

// global error handler
app.use(errorHandler);

//var port = process.env.NODE_ENV === "production" ? (process.env.PORT || 80) : 4000;

var port = process.env.PORT || 4000;

let server = http.createServer(app);
ios = io(server);
// ios.on('connection', function (client) {
//     console.log("Socket.io client connected");
// });
server.listen(port, () => console.log("HTTP Server started on port " + port));



export default ios;
//necessario per testing
module.exports = app;





