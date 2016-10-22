var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
   questionType: String,
   content: String
});