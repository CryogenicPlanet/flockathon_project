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

app.post('/events', jsonParser ,function (res,req){
    console.log("New event");
    console.log(reg.body);
        res.status(200);
         res.send("");
});