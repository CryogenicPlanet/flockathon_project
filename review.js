var User = require("./models/user");
var Admin = require("./models/admin");
var Activity = require("./models/activity");
var Team = require("./models/team");
var ActivityTemplate = require("./models/activitytemplate");
var Feedback = require("./models/feedback");

var review = (function(req,res,userId){
     var newQuestions =req.body.nums;
     var i = 0;
     var questions;
     for ( var nums in newQuestions){
      questions = ActivityTemplate.addQuestion(newQuestions.nums[i])
     i ++;
     
     }
     
 });