var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
   questionType: String,
   content: String
});

var activityTemplateSchema = new Schema({
   owner: {
       ownerType: String,
       ownerID: String
   },
   createdDate: Date,
   questions: [questionSchema]
});

var ActivityTemplate = mongoose.model('activityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;