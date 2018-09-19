// **********************************
// ********** DEPENDENCIES **********
// **********************************
var mongoose = require("mongoose");

// ****************************
// ********** SCHEMA **********
// ****************************
var emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var UserSchema = new mongoose.Schema({
  firstName: {
    required: "First name is required",
    type: String
  },
  lastName: {
    required: "Last name is required",
    type: String
  },
  about: {
    type: String
  },
  email: {
    lowercase: true,
    // match: [emailRegEx, 'Please fill a valid email address'],
    required: "Email is required",
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  
  imageSrc: {
    type: String
  },
  emailOptInUpcomingEvents: {
    default: false,
    type: Boolean
  },
  emailOptInNewsLetter: {
    default: false,
    type: Boolean
  },
  accountStatus: {
    default: "user",
    // Viable settings are user, provider, admin, and inactive
    type: String
  },
  services: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;