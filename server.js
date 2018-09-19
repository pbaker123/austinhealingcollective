// **********************************
// ********** DEPENDENCIES **********
// **********************************
require('dotenv').load();
var bodyParser = require('body-parser');
// var exphbs = require('express-handlebars');
var express = require('express');
var mongoose = require("mongoose");
var passport = require('passport');
var session = require('express-session');

// For Express
var app = express();
var PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + "/public"));

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ 
	secret: process.env.SECRET, // session secret
	resave: process.env.RESAVE, 
	saveUninitialized: process.env.SAVEUNINITIALIZED
	})
); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
// app.engine('hbs', exphbs({
//     extname: '.hbs',
//     defaultLayout: 'main'
// }));
// app.set('view engine', '.hbs');

// ****************************
// ********** MODELS **********
// ****************************
var db = require("./app/models"); // app/models/index.js loads all the other models

// ***************************
// ********** ROUTES *********
// ***************************
require('./app/routes/authRoutes.js')(app,passport);
require("./app/routes/htmlRoutes.js")(app);

// ********************************
// ********** STRATEGIES **********
// ********************************
require('./app/config/passport/passport.js')(passport, db.User);

//////////////////////////////////////
////////// Connect Database //////////
//////////////////////////////////////
mongoose.connect("mongodb://localhost/project3", { useNewUrlParser: true });

//////////////////////////////////
////////// Start Server //////////
//////////////////////////////////
app.listen(PORT, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});