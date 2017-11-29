var mongoose = require('mongoose');
var goodsSchema = require('../schemas/goods');

module.exports = mongoose.model('Goods',goodsSchema);