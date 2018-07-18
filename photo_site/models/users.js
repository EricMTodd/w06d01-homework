console.log("models/users.js is running...");


// Required npm modules
const mongoose = require("mongoose");
const Photo = require("./photos");


// User Schema for new users
const userSchema = mongoose.Schema({
	displayName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	photos: [Photo.schema]
});

module.exports = mongoose.model("User", userSchema);