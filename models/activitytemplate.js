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


activityTemplateSchema.statics.getList = function(n, accessType, id){
   if (accessType == "team") {
      return ActivityTemplate.find().limit(n);  //TODO check admin or group list
   }
   else if (accessType == "admin") {
      return ActivityTemplate.find().limit(n);  //TODO check admin or group list
   }
}



var ActivityTemplate = mongoose.model('activityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;