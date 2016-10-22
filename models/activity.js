var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
   questionType: String,
   content: String
});

var responseSchema = new Schema({
    questions: [questionSchema],
});

var activitySchema = new Schema({
    relatedTemplate: String,
    responses: [responseSchema]
});

var Activity = mongoose.model('Admin', activitySchema);

module.exports = Activity;