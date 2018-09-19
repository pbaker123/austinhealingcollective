// **********************************
// ********** DEPENDENCIES **********
// **********************************
var mongoose = require("mongoose");

// ****************************
// ********** SCHEMA **********
// ****************************
var ServiceSchema = new mongoose.Schema({
	serviceName: {
		required: "Service name is required",
		type: String
	},
	shortDescription: {
		required: "Short description is required", // This needs validation for length.
		type: String
	},
	longDescription: {
		required: "Long description is required",
		type: String
	},
	category: {
		required: "Category is required", // This needs to be selected from a drop down menu
		type: String
	},
	imageSrc: {
		type: String // this needs validation to ensure it is a link
	},
	status: {
		default: "unapproved", 
		type: String
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	lastUpdateBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	providers: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

// This creates the model from the above schema, using mongoose's model method
var Service = mongoose.model("Service", ServiceSchema);

// Export the Service model
module.exports = Service;