var mongoose = require('mongoose');
var carSchema = require('../schemas/car');

module.exports = mongoose.model('Car',carSchema);