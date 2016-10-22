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
};
adminSchema.statics.add = function(user){
    var a = new Admin ({
        relatedUser : user.uid
    });
     a.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Admin added");
        }
    });
    return a;
};

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;