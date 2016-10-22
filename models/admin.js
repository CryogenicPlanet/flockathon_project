var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    relatedUser: String,
});

module.exports = mongoose.model('Admin', adminSchema);