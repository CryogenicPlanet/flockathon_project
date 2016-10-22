// Environment Variables
var port = process.env.PORT;

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

// Event Name-Function Mappings
funcRoute.set("app.install", install)

// Event Functions
function install(req, res) {
    var res;
    console.log(req.body);
    res.status(200);
    return res;
}
// HTTP Requests
app.post('/events', jsonParser ,function (req, res) {
    console.log("New event");
    console.log(req.body);
    var event_name =req.body.name;
    res = funcRoute.get(event_name)(req, res);
    res.send();
});
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