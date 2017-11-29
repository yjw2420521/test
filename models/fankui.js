var mongoose = require('mongoose');
var fankuiSchema = require('../schemas/fankui');

module.exports = mongoose.model('Fankui',fankuiSchema);