var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    teamID: String,
    userID: String,
    preferences: {
        // user preferences go here
    }
});


userSchema.statics.add = function(fn, ln, tid, uid) {
    var u = new User({
        firstname: fn,
        lastname: ln,
        teamID: tid,
        userID: uid
    });
    u.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Post saved");
        }
    });
}


var User  = mongoose.model('User', userSchema);

module.exports = User;