console.log("controllers/users.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/users");


// Index Route
router.get("/", (req, res) => {
	User.find({}, (err, allUsers) => {
		if (err) {
			console.log(err, "Failed to display views/users/index.ejs.");
		} else {
			res.render("users/index.ejs", {
				"users": allUsers
			})
		}
	})
});


// New Route
router.get("/new", (req, res) => {
	res.render("users/new.ejs");
});

router.post("/", (req, res) => {
	User.create(req.body, (err, newUser) => {
		if (err) {
			console.log(err, "Failed to create new user.");
		} else {
			console.log(newUser, "New user successfully created.");
			res.redirect("/users");
		}
	})
});


// Show Route
router.get("/:id", (req, res) => {
	User.findById(req.params.id, (err, shownUser) => {
		if (err) {
			console.log(err, "Failed to display user page.");
		} else {
			res.render("users/show.ejs", {
				"user": shownUser
			})
		}
	})
});


// Delete Route
router.delete("/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) {
			console.log("Failed to delete user.");
		} else {
			res.redirect("/users");
		}
	})
});


// Edit route
router.get("/:id/edit", (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		if (err) {
			console.log(err, "Failed to find user.");
		} else {
			res.render("users/edit.ejs", {
				"user": foundUser
			})
		}
	})
});

router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if (err) {
			console.log(err, "Failed to update user.");
		} else {
			console.log(updatedUser, "User successfully updated.");
			res.redirect("/users");
		}
	})
});


module.exports = router;