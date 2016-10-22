// Environment Variables
var port = process.env.PORT;
var bot_token = "e904ab93-3bcc-4d9c-80aa-45fd83f07c7c";

// Server
var express = require('express');
var app = express();
var server = app.listen(port);

// Libraries
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var requestify = require('requestify');
var http = require('http');
var funcRoute = new Map();

// Mongoose Models
var User = require("models/user");
var Admin = require("models/admin");
var Activity = require("models/activity");
var Team = require("models/team");
var ActivityTemplate = require("models/activitytemplate");

// Event Name-Function Mappings
funcRoute.set("app.install", app_install)
funcRoute.set("client.pressButton", client_pressButton)

// Event Functions

function app_install(req, res) {
    var res;
    console.log(req.body);
    res.status(200);
    return res;
}

function client_pressButton(req,res){
    var button_route = new Map();
    button_route.set("chatTabButton",chat_tab)
    
    var button_type = req.body.button;
    
    
    res = button_route.get(button_type)(req,res);
    function chat_tab(req,res){
        var msg = "Feedback Form"
        var to_sent = req.body.userId;
        var attachment = [{
            "title" : "Feedback Form","description" : "Enter your feedback or complaint below",
            "views" : {
                "widget": {"src" : "https://flockathon-cryogenicplanet.c9users.io/Static/feedback.html","width": 400,"height": 400}
            }
           } ];
           attachment = JSON.stringify(attachment);
        send_attachments(msg,to_sent,bot_token,attachment);
        return res;
    }
    return res;
}

// HTTP Requests
app.post('/events', jsonParser, function(req, res) {
    console.log(req.body);
    var event_name =req.body.name;
    res = funcRoute.get(event_name)(req, res);
    res.send();
});

app.post('/feedback', jsonParser, function(req, res) {
    
});

app.use(express.static('static'));

function send_msg(msg,to_sent,from){
    var requestURL = "https://api.flock.co/v1/chat.sendMessage?to=" + to_sent + "&text=" + msg + "&token=" + from;
    console.log(requestURL);
    requestify.get(requestURL)
         .then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        response.getBody();
    });
}

function get_roster(token) {
    var requestURL = "https://api.flock.co/v1/roster.listContacts?token="+ token;
    requestify.get(requestURL)
         .then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        response.getBody();
        console.log(response);
    });
}

function send_attachments(msg,to_sent,from,attachment){
        var requestURL = "https://api.flock.co/v1/chat.sendMessage?to=" + to_sent + "&text=" + msg + "&token=" + from + "&attachments=" + attachment;
    console.log(requestURL);
    requestify.get(requestURL)
         .then(function(response) {
        // Get the response body (JSON parsed or jQuery object for XMLs)
        response.getBody();
    });
}