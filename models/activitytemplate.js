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
     // return ActivityTemplate.find({owner.ownerID: id}).limit(n);  //TODO check admin or group list
   }
   else if (accessType == "admin") {
      return ActivityTemplate.find().limit(n);  //TODO check admin or group list
   }
}

activityTemplateSchema.statics.add = function(oType, oID){
  var at = new ActivityTemplate({
  //   owner.ownerType: oType,
  //   owner.ownerID: oID
  });
  at.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("New activity template created.");
        }
    });
};


var ActivityTemplate = mongoose.model('activityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;