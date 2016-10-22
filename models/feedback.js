var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    title : String,
    content: String,
    teamID: String,
    createdDate : Date
});
    
feedbackSchema.statics.addFeedback = function(t, cn, tid) {
    var f = new Feedback({
        title: t,
        content: cn,
        teamID: tid,
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
    return f;
};

feedbackSchema.statics.getLatest = function(){
    // var feedbackarray;
    // Feedback.find({}, function(err, fbarr) {
    //     if (!err){
    //         feedbackarray = fbarr;
    //     }
    // });
    // return feedbackarray.limit(25).sort('createdDate');
    var query = Feedback.find({});
    
    
};

var Feedback  = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;