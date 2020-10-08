const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');

module.exports = server => {
    //Register User
    server.post('/register', (req, res, next) => {
        const { email, password } = req.body;
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Hash password 
                user.password = hash;
                //Save user
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });

    // Authorize User
    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            // Authenticate user
            const user = await auth.authenticate(email, password);

            // Create JSON Web Token
            const token = jwt.sign(user.toJSON());

            next();
        } catch (err) {
            // User Unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    });
};