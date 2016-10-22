var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    relatedUser: String,
    preferences: {
        // Admin prefs go here. 
    }
});

adminSchema.statics.isAdmin = function(uid) {
    if (Admin.findOne({relatedUser:uid})) {
        return(true);
    }
    else {
        return(false);
    }
}

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;