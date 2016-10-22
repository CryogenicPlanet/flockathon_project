// Libraries
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var requestify = require('requestify');
var http = require('http');
var mongoose = require('mongoose');
var sleep = require('sleep');

// Server
var express = require('express');
var app = express();
var server = app.listen(port);
app.set('view engine', 'jade');

// Mongoose Models
var User = require("./models/user");
var Admin = require("./models/admin");
var Activity = require("./models/activity");
var Team = require("./models/team");
var ActivityTemplate = require("./models/activitytemplate");
var Feedback = require("./models/feedback");



// Event Name-Function Mappings
var funcRoute = new Map();
funcRoute.set("app.install", app_install);
funcRoute.set("client.pressButton", client_pressButton);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

app.use(express.static('static'));