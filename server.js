// Environment Variables
var port = process.env.PORT;
var bot_token = "e904ab93-3bcc-4d9c-80aa-45fd83f07c7c";

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
    var button_route = new Map();
    button_route.set("chatTabButton", chat_tab);
    var button_type = req.body.button;
    res = button_route.get(button_type)(req,res);
    function chat_tab(req,res){
        var msg = "Feedback Form";
        var to_sent = req.body.userId;
        var attachment = [{
            "title" : "Feedback Form","description" : "Enter your feedback or complaint below",
            "views" : {
                "widget": {"src" : "https://flockathon-cryogenicplanet.c9users.io/widgets/feedback.html","width": 400,"height": 400}
            }
           }];
           attachment = JSON.stringify(attachment);
        send_attachments(msg,to_sent,bot_token,attachment);
        feedback_form(req.body.userId);
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
    res.end();
    if (req.body.name =="app.install"){
        var newUser = User.add(req.body.userId,req.body.token);
        Admin.add(newUser);
        //setTimeout(call_userinfo(newUser),500000);
    }
});

app.get('/widget',jsonParser,function(req,res){
    var flockEvent = JSON.parse(req.query.flockEvent);
    if (!Admin.isAdmin(flockEvent.userId)) {
        res.sendFile("/widgets/not_admin.html");
    }
    else {
        var btn = flockEvent.button;
        if (btn == "appLauncherButton") {
            
        }
        else if (btn == "attachmentPickerButton") {
            
        }
    }
//     if (Admin.isAdmin(flockEvent.userId)== false){
//         res.sendFile("/widgets/not_admin.html");
//         } else {
//             if (flockEvent.button =="appLauncherButton"){
//                 var feedback = Feedback.getLatest();
//                 var user;
//                 console.log(feedback);
//                 var query =  User.find({"userId" : flockEvent.userId},{ teamID :1});
//                 query.exec(function(err, x){
//                         if (!err) {
//                          user = x;
//                         }
//                     });
//                 console.log(user);
//                 console.log(user.teamID);
//                 console.log(Feedback.getLatest(user.teamID));
//             res.send(pug.renderFile('./views/admin.pug', {header : "Feedback"// ,title : feedback.title, content : feedback.content}));
// }));
//             } else if (flockEvent.button =="attachmentPickerButton"){
//                 res.render = ""; //create new review page
//             }
//         }
//     res.send();
});

function feedback_form(userId){
  var user =  User.find({"uid" : userId},{ teamID :1});
    app.post('/widgets/feedback', jsonParser, function(req, res) {
        Feedback.addFeedback(req.title, req.content,user.teamID);
    });
}

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
    // Get the response body (JSON parsed or jQuery object for XMLs)
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