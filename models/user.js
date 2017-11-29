var mongoose = require('mongoose');
var usersSchema = require('../schemas/user');

module.exports = mongoose.model('User',usersSchema);