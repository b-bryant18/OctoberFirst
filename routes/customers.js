const errors = require('restify-errors');
const customer = require('../models/customer');

module.exports = server => {
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
};
//waits for customer object to get back, then gets saved to customer const