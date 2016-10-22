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
var event_name;
funcRoute.set("app.install", install)

function install(reqbody) {
    console.log(reqbody);
}

app.post('/events', jsonParser ,function (res,req){
    console.log("New event");
    console.log(reg.body);
        res.status(200);
         res.send("");
         event_name =req.body.name;
          funcRoute.get(event_name)(req.body);

});