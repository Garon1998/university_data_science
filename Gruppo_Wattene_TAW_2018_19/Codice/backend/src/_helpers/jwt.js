/*
    JWT Middleware. Controlla validita del token JWT. Esclude due route dove vengono effettuati registrazione e login.
*/

var expressJwt = require('express-jwt');
var config = require('../../src/config.json');
require('dotenv').config();
import UserService from '../services/user.service';

module.exports = jwt;

function jwt() {
    const secret = process.env.TOKEN_SECRET;
    return expressJwt({ secret, isExpired, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            { url: "/users/refresh", methods: ["POST"] },
            { url: "/users/login", methods: ["POST"] },
            { url: "/", methods: ["GET"] }
        ]
    });
}

async function isExpired(req, payload, done) {
    const secret = process.env.TOKEN_SECRET;
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer')
        token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return done(null, true);
        }
    });
}
async function isRevoked(req, payload, done) {
    var userService = new UserService();
    var user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}