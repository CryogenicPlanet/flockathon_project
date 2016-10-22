var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
   questionID: String,
   content: String
});

var responseSchema = new Schema({
    questions: [questionSchema],
});

var activitySchema = new Schema({
    relatedTemplate: String,
    responses: [responseSchema]
});

activitySchema.methods.addResponse = function(response) {
    var resp = new Response();
    var questionresp = response.questionresp;
    for (var i = 0; i < questionresp.length; i++) {
        resp.questions.push(questionresp[i]);
    }
    this.push(resp);
};

var Response = mongoose.model('response', responseSchema);
var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;