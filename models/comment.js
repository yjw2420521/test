var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment');

module.exports = mongoose.model('Comment',commentSchema);