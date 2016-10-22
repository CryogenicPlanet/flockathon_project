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

module.exports = mongoose.model('User', userSchema);