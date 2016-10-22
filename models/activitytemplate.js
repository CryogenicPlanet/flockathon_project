var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activityTemplateSchema = new Schema({
   owner: {
       ownerType: String,
       ownerID: String
   },
   createdDate: Date,
   questions: 
});

module.exports = mongoose.model('activityTemplate', activityTemplateSchema);