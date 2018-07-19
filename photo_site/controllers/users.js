console.log("controllers/users.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photo = require("../models/photos");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.render("users/index.ejs", {
			"users": allUsers
		})
	} catch (err) {
		res.send(err)
	}
});


// New Route
router.get("/new", async (req, res) => {
	res.render("users/new.ejs");
});

router.post("/", async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		res.redirect("/users");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownUser = await User.findById(req.params.id);
		res.render("users/show.ejs", {
			"user": shownUser
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		const photoIds = [];
		for (let i = 0; i < deletedUser.photos.length; i++) {
			photoIds.push(deletedUser.photos[i]._id);
		}
		Photo.remove( { _id: { $in: photoIds } } );
		res.redirect("/users");
	} catch (err) {
		res.send(err)
	}
});


// Edit route
router.get("/:id/edit", async (req, res) => {
	try {
	const foundUser = await User.findByid(req.params.id);
	res.render("users/edit.ejs", {
		"user": foundUser
	})
	} catch (err) {
		res.send(err)
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect("/users");
	} catch (err) {
		res.send(err)
	}
});


module.exports = router;