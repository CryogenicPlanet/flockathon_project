var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
   //questionType: String,
   content: String,
   quesID : Number
});

var activityTemplateSchema = new Schema({
   createdDate: Date,
   questions: [questionSchema]
   
});


// activityTemplateSchema.statics.getList = function(n, accessType, id){
//   // if (accessType == "team") {
//   //    return ActivityTemplate.find({'owner.ownerID': id}).limit(n);  //TODO check admin or group list
//   // }
//   // else if (accessType == "admin") {
//   //    return ActivityTemplate.find().limit(n);  //TODO check admin or group list
//   // }
//   // return ActivityTemplate.find({'owner.ownerID': id}).limit(n);
   
//   var query = ActivityTemplate.find({'owner.ownerID': id}).limit(n);
    
//     query.exec(function(err, ActivityTemplateList){
//         if (!err) {
//             return(ActivityTemplateList);
//         }
//     });
// };

// activityTemplateSchema.statics.add = function(oID){
//   var at = new ActivityTemplate({
//     // 'owner.ownerType': oType,
//      'owner.ownerID': oID
//   });
//   at.save(function (err) {
//         if (err) {
//             return err;
//         }
//         else {
//             console.log("New activity template created.");
//         }
//     });
//   return(at);
// };
activityTemplateSchema.methods.addQuestion = function(cont){
   var question = new Question();
  // question.questionType = qType;
   question.content = cont;
   question.save();
   this.questions.push(question);
   this.save();
   return question;
};

var Question = mongoose.model('question', questionSchema);
var ActivityTemplate = mongoose.model('activityTemplate', activityTemplateSchema);

module.exports = ActivityTemplate;