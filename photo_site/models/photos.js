console.log("models/photos.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Photo schema for photo uploads
const photoSchema = mongoose.Schema({
	title: String,
	uploadDate: { type: Date, default: Date.now },
	array: [],
	about: String,
});

module.exports = mongoose.model("Photo", photoSchema);