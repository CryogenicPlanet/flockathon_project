var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    relatedUser: String,
    preferences: {
        // Admin prefs go here. 
    }
});

module.exports = mongoose.model('Admin', adminSchema);