const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

//Records 'created at' & 'updated at' message automatically
customerSchema.plugin(timestamp);

const customer = mongose.model('Customer', customerSchema);
module.exports = customer;