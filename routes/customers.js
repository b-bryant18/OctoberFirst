const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = server => {
    //Get Customers
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // Add Customer
    server.post('/customers', async (req, res, next) => {
        //Check is content type is NOT JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'apllication/json' "));
        }

        // Creates customer object
        const { name, email, balance } = req.body;
        //Instead of req.body.name, req.body.email, etc. 
        // Don't need name = name, email = email bc I'm using ES6
        const customer = new Customer({
            name,
            email,
            balance
        });

        // Saves customer to database
        try {
            const newCustomer = await customer.save();
            res.send(201);
            //means newCustomer object was created
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });
};
//waits for customer object to get back, then gets saved to customer const
//then sends response once found
//Upon completion of a function, call 'next' to move to the next function in the chain
