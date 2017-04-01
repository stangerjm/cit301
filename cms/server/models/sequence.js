var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  maxContactsId: {type: Number, required: true},
  maxMessagesId: {type: Number, required: true},
  maxDocumentsId: {type: Number, required: true},
});

module.exports = mongoose.model('Sequence', schema);
