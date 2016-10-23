// Environment Variables
var port = process.env.PORT;
var bot_token = "1fec20c7-6f0e-43af-ac8f-bddd7abe8f76";

// Libraries
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var requestify = require('requestify');
var jade = require('jade');
var http = require('http');
var mongoose = require('mongoose');
var pug = require('pug');
// Server
var express = require('express');
var app = express();
var server = app.listen(port);
app.set('view engine', 'pug');

// Mongoose Models
var User = require("./models/user");
var Admin = require("./models/admin");
var Activity = require("./models/activity");
var Team = require("./models/team");
var ActivityTemplate = require("./models/activitytemplate");
var Feedback = require("./models/feedback");

// Pug compiled files
var compiledAdmin = pug.compileFile('./views/admin.pug');

// Event Name-Function Mappings
var funcRoute = new Map();
funcRoute.set("app.install", app_install);
funcRoute.set("client.pressButton", client_pressButton);
    
var buttonroute = new Map();
buttonroute.set("attachmentPicker", attachmentPickerButton);
buttonroute.set("chatTabButton", chatTabButtonEvent);
buttonroute.set("appLauncherButton", appLauncherButtonEvent);


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

// Event Functions

function app_install(req, res) {
    var res;
    console.log(req.body);
    res.status(200);
    return res;
}

function client_pressButton(req,res){
    console.log(req.body);
    var button_type = req.body.button;
    res = buttonroute.get(button_type)(req, res);
    return res;
}

function attachmentPickerButton(req, res) {
    var msg = "Feedback-Form";
    var to_sent = req.body.userId;
    var attachment = [{
        "title" : "Feedback Form","description" : "Enter your feedback or complaint below",
        "views" : {
            "widget": {"src" : "https://flockathon-project-lunaroyster.c9users.io/widgets/feedback.html","width": 400,"height": 400}
        }
    }];
    attachment = JSON.stringify(attachment);
    send_attachments(msg,to_sent,bot_token,attachment);
    return res;
}

function chatTabButtonEvent(req, res) {
    
}

function appLauncherButtonEvent(req, res) {
    Feedback.getLatest(function(fbarray) {
        console.log(fbarray);
        res.send(pug.renderFile('./views/admin.pug', {header : "Feedback", feedbackarray: fbarray}));
    });
}

// HTTP Requests
app.post('/events', jsonParser, function(req, res) {
    console.log(req.body);
    var event_name =req.body.name;
    res = funcRoute.get(event_name)(req, res);
    res.send();
    res.end();
});

app.get('/events', jsonParser, function(req,res){
  var flockEvent = JSON.parse(req.query.flockEvent);
    console.log(flockEvent);
    if (!Admin.isAdmin(flockEvent.userId)){
        res.sendFile("/widgets/not_admin.html");
    } 
    else {
        res = buttonroute.get(flockEvent.button)(req, res);
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/widgets/feedback', function(req, res) {
    console.log(req.body);
    var f = new Feedback({
        title: req.body.title,
        content: req.body.content,
        createdDate: Date.now()
    });
    f.save(function (err, f) {
        if (err) return console.error(err);
    });
    res.status(200);
    res.send();
});

app.post('/widgets/review', jsonParser, function(req, res) {
    
});

// app.post('/responses', jsonParser, function(req, res) {
    
// });

app.use(express.static('static'));

function send_msg(msg,to_sent,from){
    var requestURL = "https://api.flock.co/v1/chat.sendMessage?to=" + to_sent + "&text=" + msg + "&token=" + from;
    console.log(requestURL);
    requestify.get(requestURL).then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        response.getBody();
    });
}

function get_roster(token) {
    var requestURL = "https://api.flock.co/v1/roster.listContacts?token="+ token;
    requestify.get(requestURL).then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        response.getBody();
        console.log(response);
    });
}

function send_attachments(msg,to_sent,from,attachment){
    var requestURL = "https://api.flock.co/v1/chat.sendMessage?to=" + to_sent + "&text=" + msg + "&token=" + from + "&attachments=" + attachment;
    console.log(requestURL);
    requestify.get(requestURL).then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs) // TODO: fix request
        response.getBody();
    });
}

function get_userinfo(utoken){
    var requestURL = "https://api.flock.co/v1/users.getInfo?token=" + utoken;
    console.log(requestURL);
    requestify.get(requestURL)
    .then(function(response) {
        return response.body;
    });
}

function call_userinfo(newUser){
        var userinfo = get_userinfo(newUser.token);
        newUser = newUser.updateUserInfo(userinfo.firstname,userinfo.lastname,userinfo.teamID);
        if (userinfo.role!="user"){
        Admin.add(newUser);
    }
}