// Environment Variables
var port = process.env.PORT;

// Server
var express = require('express');
var app = express();
var server = app.listen(port);

// Libraries
var bodyParser = require('body-parser');
var requestify = require('requestify');
var http = require('http');
var funcRoute = new Map();

// Event Name-Function Mappings
funcRoute.set("app.install", install)

// Event Functions
function install(reqbody) {
    var res;
    console.log(reqbody);
    res.status(200);
    return res;
}
// HTTP Requests
app.post('/events', jsonParser ,function (res,req){
    console.log("New event");
    console.log(req.body);
    var event_name =req.body.name;
    res = funcRoute.get(event_name)(req.body);
    res.send();
});