// ***************************
// ********** ROUTES *********
// ***************************
module.exports = function(app, passport) {
  app.post(
  	'/signup', passport.authenticate('local-signup'), (req, res) => {
  		res.send(req.user)
  });
  app.post(
  	'/signin',
  	passport.authenticate('local-signin'), (req, res) => {
  		res.send(req.user)
  });
};