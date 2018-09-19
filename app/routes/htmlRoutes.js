// **********************************
// ********** DEPENDENCIES **********
// **********************************
var htmlController = require('../controllers/htmlController.js');
 
// ***************************
// ********** ROUTES *********
// ***************************
module.exports = function(app, passport) {
  // ********************************
  // ********** GET Routes **********
  // ********************************
  app.get('/signup', htmlController.signup); // Route for sign-up page
  app.get('/signin', htmlController.signin); // Route for sign-in page
  app.get('/dashboard', isLoggedIn, htmlController.dashboard); // Route for mainpage with access control
  app.get('/profile', isLoggedIn, htmlController.profile); // Route for profile updates
  app.get('/users', isAdmin, htmlController.users); // Route for admins to update accountStatus
  
  app.get('/manageservice', isAdmin, htmlController.manageservice);
  app.get('/logout',htmlController.logout); // Route for user logout
  app.get('/practitioneraccounts', htmlController.practitionerAccounts); // React Route
  app.get('/allaccounts', htmlController.allAccounts);  // React Route
  app.get('/servicelist', htmlController.serviceList); // React Route
  app.get('/allservices', htmlController.allServices); // React Route


  // *********************************
  // ********** POST Routes **********
  // *********************************
  
  app.post('/userUpdate', htmlController.userUpdate);
  app.post('/manageService', htmlController.manageService);
  // app.post('/deleteService', htmlController.deleteService);
  app.post('/newservice', htmlController.newService); // React Route

  // ********************************
  // ********** PUT Routes **********
  // ********************************
  app.put('/updateuser/:id', htmlController.updateUser); // React Route
  app.put('/updateservice/:id', htmlController.updateService); // React Route
  

  // ***********************************
  // ********** DELETE Routes **********
  // ***********************************
  app.delete('/deleteuser/:id', isAdmin, htmlController.deleteUser); // React Route
  app.delete('/deleteservice/:id', isAdmin, htmlController.deleteService); // React Route
  
  // Access control to verify user is logged in and account status when required
  function isLoggedIn(req, res, callback) {
    if (req.isAuthenticated()) return callback();
   	res.redirect('/signin');
 	};
  function isAdmin(req, res, callback) {
    if (!req.isAuthenticated()) res.redirect('/dashboard');
    if (req.user.accountStatus === "admin") return callback();
    res.redirect('/dashboard');
    
  };
  function isProvider(req, res, callback) {
    if (!req.isAuthenticated()) res.redirect('/dashboard');
    if (req.user.accountStatus === "admin" || !req.user.accountStatus === "provider") return callback();
    res.redirect('/dashboard');
  };
};