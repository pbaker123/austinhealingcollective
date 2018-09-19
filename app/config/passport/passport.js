// **********************************
// ********** DEPENDENCIES **********
// **********************************
var bCrypt = require('bcrypt-nodejs'); // bcrypt - library to hash passwords

// ******************************
// ********** STRATEGY **********
// ******************************
module.exports = function(passport, user) {
	var User = user; // user is passed from server.js and is db.User
  var LocalStrategy = require('passport-local').Strategy;
  
  // Signup Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {
  	var generateHash = function(password) {
	 		return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
	 	};

	 	User.find({email: email}).then(function(user) {
	    if (user.length === 0) {
	      var userPassword = generateHash(req.body.password);
	      var data = {
	      	firstName: req.body.firstname,
	        lastName: req.body.lastname,
	        email: email,
	        password: userPassword,
	        emailOptInUpcomingEvents: req.body.emailOptInUpcomingEvents,
	        emailOptInNewsLetter: req.body.emailOptInNewsLetter,
          accountStatus: "user" 
	      };
	      User.create(data).then(function(newUser, created) {
	        if (!newUser) {
	          return done(null, false);
	        };
	        if (newUser) {
	          return done(null, newUser);
	        };
	      });
	    } else {
				console.log('An account has already been created with this email'); // Add a route to handle this exception
	      return;
	    };
		}).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
    });
	}));

	// Signin Strategy
	passport.use('local-signin', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
 			var User = user; // user is passed from server.js and is db.User
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass); // Uses the bCrypt comparision method to compare the password entered with the password in Mongo
      }; 
      User.find({email: email}).then(function(user) {
        if (user[0].length === 0) {
          return done(null, false, {
            message: 'Incorrect username or password'
          });
        };
        if (!isValidPassword(user[0].password, password)) {
          return done(null, false, {
            message: 'Incorrect username or password.'
          });
        };
        return done(null, user);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
		}	
 	));
	
	// Serialize User
	passport.serializeUser(function(user, done) {
    if (typeof user === "array") done(null, user[0])
	  else done(null, user);
	});

	// Deserialize User 
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
      done(err, user);
    });
 	});
};