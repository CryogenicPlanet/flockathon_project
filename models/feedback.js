var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    title : String,
    content: String,
    // teamID: String,
    createdDate : Date
});
    
// feedbackSchema.statics.addFeedback = function(t, cn, tid) {
feedbackSchema.statics.addFeedback = function(t, cn) {
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

// feedbackSchema.statics.getLatest = function(tid){
//     var query = Feedback.find({'teamID': tid}).limit(25).sort({createdDate: -1});
    
//     query.exec(function(err, feedbackarray){
//         if (!err) {
//             return feedbackarray;
//         } else {
//             return "error" + err;
//         }
//     });
// };

feedbackSchema.statics.getLatest = function(){
    // var query = Feedback..limit(25).sort({createdDate: -1});
    // query.exec(function(err, feedbackarray){
    //     if (!err) {
    //         return feedbackarray;
    //     } else {
    //         return "error" + err;
    //     }
    // });
    
    Feedback.find({}, function(err, feedbackarray) {
        if (err) throw err;
        console.log(feedbackarray);
    });
};

var Feedback  = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;