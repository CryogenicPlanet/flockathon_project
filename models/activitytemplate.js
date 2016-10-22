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


activityTemplateSchema.statics.getList = function(n){
   return ActivityTemplate.find().limit(n);
}



var ActivityTemplate = mongoose.model('activityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;