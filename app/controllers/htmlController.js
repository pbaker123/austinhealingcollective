var bCrypt = require('bcrypt-nodejs'); // bcrypt - library to hash passwords

// ****************************
// ********** MODELS **********
// ****************************
var db = require("../models"); // app/models/index.js loads all the other models

// *********************************
// ********** Controllers **********
// *********************************
var exports = module.exports = {}
 
// *******************************************
// ********** GET Route Controllers **********
// *******************************************
exports.signup = function(req, res) {
  res.render('signup');
};

exports.signin = function(req, res) {
  res.render('signin');
};

exports.dashboard = function(req, res) {
  res.render('dashboard', accountStatusHelper(req.user.accountStatus));
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
  	res.redirect('/');
 	});
};

exports.profile = function(req, res) {
	db.User.findById(req.user.id).then(function(userData) {
	// Sample of data
	// 	{ 
	// 		emailOptInUpcomingEvents: true,
  // 		emailOptInNewsLetter: true,
  // 		accountStatus: 'Admin',
  // 		_id: 5b8707c4cfe51113704b92b5,
  // 		firstName: 'Admin',
 	// 		lastName: '1',
  // 		email: 'admin@admin.com',
  // 		password: '$2a$08$laWc5qMX5YPnPl0dE.znAu1Oabhg4X8WbbIGghtvR7sFgwSKDrxiS',
  // 		__v: 0 
  // 	}
		res.render('profile', userData)
	});
};

exports.users = function(req, res) {
  db.User.find().then(function(userData) {
    db.Service.find({status: "approved"}).then(function(serviceData) {
      console.log(serviceData)
      var classArr = [];
      var meditationArr = [];
      var healingArr = [];
      for (var i = 0; i < userData.length; i++) {
        userData[i].data = accountStatusHelper(userData[i].accountStatus);
      };
      for (var i = 0; i < serviceData.length; i++) {
        if (serviceData[i].category === "class") {
          classArr.push(serviceData[i])
        } else if (serviceData[i].category === "meditation") {
          meditationArr.push(serviceData[i])
        } else if (serviceData[i].category === "healing") {
          healingArr.push(serviceData[i])
        }
      }
      dataObject = {
        userData: userData,
        classData: classArr,
        meditationData: meditationArr,
        healingData: healingArr
      };
      console.log(dataObject)
      res.render('users', dataObject)
    });
  });
};

// exports.newservice = function(req, res) {
//   res.render('newservice', {_id: req.user._id});
// };

exports.manageservice = function(req, res) {
  db.Service.find().populate("users").then(function(serviceData) {
    var servicesObject = {
      unapprovedServices: [],
      approvedServices: [],
      scrappedServices: []
    };
    for (var i = 0; i < serviceData.length; i++) {
      if(serviceData[i].status === "unapproved") servicesObject.unapprovedServices.push(serviceData[i]);
      if(serviceData[i].status === "approved") servicesObject.approvedServices.push(serviceData[i]);
      if(serviceData[i].status === "scrapped") servicesObject.scrappedServices.push(serviceData[i]);
    }
    // res.json(servicesObject)
    res.render('manageservice', servicesObject);
  });
};

exports.practitionerAccounts = (req, res) => {
  db.User.find({ $or: [{accountStatus: "practitioner"}, {accountStatus: "admin"}]})
    .then((userData) => {
      res.json(userData)
    })
};

exports.allAccounts = (req, res) => {
  db.User.find()
    .then((userData) => {
      var sortedData = {
        admins: [],
        practitioners: [],
        users: []
      };
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].accountStatus === "admin") {
          sortedData.admins.push(userData[i])
        } else if (userData[i].accountStatus === "practitioner") {
          sortedData.practitioners.push(userData[i])
        } else {
          sortedData.users.push(userData[i])
        }
      }
      res.json(sortedData)
    })
};

exports.serviceList = (req, res) => {
  db.Service.find({ status: "approved" })
    .then((serviceData) => {
      res.json(serviceData)
    })
}

exports.allServices = (req, res) => {
  db.Service.find()
    .then((serviceData) => {
      var sortedData = {
        approved: [],
        unapproved: [],
        scrapped: []
      };
      for (var i = 0; i < serviceData.length; i++) {
        if (serviceData[i].status === "approved") {
          sortedData.approved.push(serviceData[i])
        } else if (serviceData[i].status === "scrapped") {
          sortedData.scrapped.push(serviceData[i])
        } else {
          sortedData.unapproved.push(serviceData[i])
        }
      }
      res.json(sortedData);
    })
}


// ********************************************
// ********** POST Route Controllers **********
// ********************************************


exports.userUpdate = function(req, res) {
  db.User.findByIdAndUpdate(req.body._id, {accountStatus: req.body.accountStatus}, function(err, doc){
    if (err) return res.send(500, { error: err });
    res.redirect('users');
  });
};

exports.newService = function(req, res) {
  db.Service
    .create(req.body)
    .then((service) => res.json(service);
    .catch(err => res.json(err))
};

exports.manageService = function(req, res) {
  db.Service
    .findByIdAndUpdate(req.body._id, req.body, function(err, doc) {
    if (err) return res.send(500, {error: err});
    res.redirect('manageservice')
  });
};

exports.deleteService = function(req, res) {
  db.Service.findByIdAndDelete(req.body._id, function(err, doc) {
    if (err) return res.send(500, {error: err});
    res.redirect('manageservice')
  });
};

// *******************************************
// ********** PUT Route Controllers **********
// *******************************************
exports.updateUser = (req, res) => {
  var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
  };
  if (req.body.password) {
    req.body.password = generateHash(req.body.password)
  }
  db.User
    .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(422).json(err));      
}

exports.updateService = (req, res) => {
  db.Service
    .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
    .then(service => {
      res.json(service)
    })
    .catch(err => res.status(422).json(err));
}

// **********************************************
// ********** DELETE Route Controllers **********
// **********************************************
exports.deleteUser = (req, res) => {

  db.User
    .findById({ _id: req.params.id })
    .then(user => user.remove())
    .then(user => res.json(user))
    .catch(err => res.status(422).json(err));      
}

exports.deleteService = (req, res) => {

  db.Service
    .findById({ _id: req.params.id })
    .then(user => user.remove())
    .then(user => res.json(user))
    .catch(err => res.status(422).json(err));      
}

// **************************************
// ********** Helper Functions **********
// **************************************
function accountStatusHelper(accountStatus) {
  var data = {
    admin: false,
    provider: false,
    user: false,
    inactive: false
  }
  switch (accountStatus) {
    case "admin":
      data.admin = true;
      return data;
    case "provider":
      data.provider = true;
      return data;
    case "user":
      data.user = true;
      return data;
    case "inactive":
      data.inactive = true;
      return data;
  };
};