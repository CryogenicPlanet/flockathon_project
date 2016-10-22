var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    teamID: String,
    userID: String,
    userToken: String,
    preferences: {
        // user preferences go here
    }
});


userSchema.statics.add = function(uid, token) {
    var u = new User({
        userID: uid,
        userToken: token
    });
    u.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("User added.");
        }
    });
    return u;
};
userSchema.methods.updateUserInfo = function(fn, ln, tid, cb) {
    return this;
};
userSchema.methods.updateToken = function(token, cb) {
    // this.model('User').update({userID: uid}, {$set: {userToken: token}});
    // this.update({userID: uid}, {$set: {userToken: token}});
    this.userToken = token;
    cb(this);
};


var User  = mongoose.model('User', userSchema);

module.exports = User;