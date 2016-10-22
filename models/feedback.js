var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    title : String,
    content: String,
    createdDate : Date
});
    
feedbackSchema.statics.addFeedback = function(tn,cn) {
    var f = new Feedback({
        title: tn,
        content: cn,
        createdDate: Date.now()
    });
    f.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Feedback Saved");
        }
    });
};

feedbackSchema.statics.getLatest = function(){
    return Feedback.find().limit(25).sort('createdDate');
};

var Feedback  = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;