/*
    Gestione autenticazione per i singoli endpoint
*/

const expressJwt = require('express-jwt');
require('dotenv').config();
import UserService from '../services/user.service';
module.exports = authorize;

function authorize(roles = []) {
    const secret = process.env.TOKEN_SECRET;
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret, isRevoked }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
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