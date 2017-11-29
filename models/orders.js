var mongoose = require('mongoose');
var ordersSchema = require('../schemas/orders');

module.exports = mongoose.model('Orders',ordersSchema);