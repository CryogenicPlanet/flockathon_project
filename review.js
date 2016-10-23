var User = require("./models/user");
var Admin = require("./models/admin");
var Activity = require("./models/activity");
var Team = require("./models/team");
var ActivityTemplate = require("./models/activitytemplate");
var Feedback = require("./models/feedback");
var pug = require('pug');
var exports = module.exports = {};
var i;
var len;
exports.newReview = function(req,res){
     var newQuestions =req.body.nums;
     
     var questions;
     for (i = 0 ;len = newQuestions.length;i< len){
      questions = ActivityTemplate.addQuestion(newQuestions.nums[i])
     i ++;
     
     }
    var currentReview = ({'StartId' : questions._id[0],'Size' : i});
     return [questions,currentReview];
     
};
exports.sendReview = function(currentReview,questions){
    //getting questions
    var array;
    var x =0;
    for (var i = currentReview.size;i >= 0;i--){
        array[x] = ActivityTemplate.find({'_Id' : currentReview.StartId +i},'question.content',function (err,question ) {
        if (err) return handleError(err);
        console.log(question);
        });
        x++;
        return  array
    }
};

exports.reviewCompleted = function(req,res){
    var newAnswwers = req.body.ans;
    var questions_id = req.body.ques;
    
    var questions;
  for (i =0;len = questions.length;i< len){
      ActivityTemplate.getQuestionById(_id,function (question){
          questions[i] = question;
      });
      i++;
  }
  var resp = new Response();
  for (i =0,len = newAnswwers.length;i< len;i++){
      resp[i] = {'questions' : questions[i], 'content': newAnswwers[i].content};
  }
  }
;
