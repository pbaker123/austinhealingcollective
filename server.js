// **********************************
// ********** DEPENDENCIES **********
// **********************************
require('dotenv').load();
var path = require("path");
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require("mongoose");
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// var SessionStore = require('session-mongoose')(express);

// For Express
var app = express();
var PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "client", "build")));

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";

// For Passport
app.use(session({
    secret: 'sdfasd sfdasfd',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        host: '127.0.0.1',
        port: '27017',
        db: 'session',
        url: 'mongodb://heroku_d7jr2w1n:d2jcrknr857ep9kad4ss2n4ktf@ds163382.mlab.com:63382/heroku_d7jr2w1n'
    })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ****************************
// ********** MODELS **********
// ****************************
var db = require("./app/models"); // app/models/index.js loads all the other models

// ***************************
// ********** ROUTES *********
// ***************************
require('./app/routes/authRoutes.js')(app,passport);
require("./app/routes/htmlRoutes.js")(app);
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// ********************************
// ********** STRATEGIES **********
// ********************************
require('./app/config/passport/passport.js')(passport, db.User);

//////////////////////////////////////
////////// Connect Database //////////
//////////////////////////////////////
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//////////////////////////////////
////////// Start Server //////////
//////////////////////////////////
app.listen(PORT, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});
