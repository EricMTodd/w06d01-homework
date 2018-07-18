console.log("controllers/photos.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");


// Index Route
router.get("/", (req, res) => {
	Photo.find({}, (err, allPhotos) => {
		if (err) {
			console.log(err, "Failed to display views/photos/index.ejs");
		} else {
			res.render("photos/index.ejs", {
				"photos": allPhotos
			})
		}
	})
});


// New Route
router.get("/new", (req, res) => {
	res.render("photos/new.ejs");
});

router.post("/", (req, res) => {
	Photo.create(req.body, (err, newPhoto) => {
		if (err) {
			console.log(err, "Failed to upload new photo.");
		} else {
			console.log(newPhoto, "New photo successfully uploaded.");
			res.redirect("/photos");
		}
	})
});


module.exports = router;