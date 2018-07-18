console.log("controllers/users.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photo = require("../models/photos");


// Index Route
router.get("/", (req, res) => {
	User.find({}, (err, allUsers) => {
			res.render("users/index.ejs", {
				"users": allUsers
			})
	})
});


// New Route
router.get("/new", (req, res) => {
	res.render("users/new.ejs");
});

router.post("/", (req, res) => {
	User.create(req.body, (err, newUser) => {
			console.log(newUser, "New user successfully created.");
			res.redirect("/users");
	})
});


// Show Route
router.get("/:id", (req, res) => {
	User.findById(req.params.id, (err, shownUser) => {
			res.render("users/show.ejs", {
				"user": shownUser
			})
	})
});


// Delete Route
router.delete("/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		const photoIds = [];
		for (let i = 0; i < deletedUser.photos.length; i++) {
			photoIds.push(deletedUser.photos[i]._id);
		}
		Photo.remove({
			_id: { $in: photoIds }
		}, (err, data) => {
			res.redirect("/users");
		})
	})
});


// Edit route
router.get("/:id/edit", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
			res.render("users/edit.ejs", {
				"user": foundUser
			})
	})
});

router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
			console.log(updatedUser, "User successfully updated.");
			res.redirect("/users");
	})
});


module.exports = router;