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
