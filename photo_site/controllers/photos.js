console.log("controllers/photos.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");
const User = require("../models/users");


// Index Route
router.get("/", async (req, res) => {
	try {
		const allPhotos = await Photo.find({})
		res.render("photos/index.ejs", {
			"photos": allPhotos
		})
	} catch (err) {
		res.send(err)
	}
});


// New Route
router.get("/new", async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.render("photos/new.ejs", {
			"users": allUsers
		})
	} catch (err) {
		res.send(err)
	}
});

router.post("/", async (req, res) => {
	try {
		const foundUser = await User.findById(req.body.userId);
		const newPhoto = await Photo.create(req.body)
		foundUser.photos.push(newPhoto);
		const data = await foundUser.save();
		res.redirect("/photos");
	} catch (err) {
		res.send(err)
	}
});


// Show Route
router.get("/:id", async (req, res) => {
	try {
		const shownPhoto = await Photo.findById(req.params.id);
		const foundUser = await User.findOne({"photos._id":req.params.id});
		res.render("photos/show.ejs", {
			"photo": shownPhoto,
			"user": foundUser
		})
	} catch (err) {
		res.send(err)
	}
});


// Delete Route
router.delete("/:id", async (req, res) => {
	const deletedPhoto = await Photo.findByIdAndRemove(req.params.id);
	const foundUser = await User.findOne({"photos._id":req.params.id});
	foundUser.photos.id(req.params.id).remove();
	foundUser.save();
	res.redirect("/photos");
});


// Edit Route
router.get("/:id/edit", async (req, res) => {
	const foundPhoto = await Photo.findById(req.params.id);
	const allUsers = await User.find({});
	const foundPhotoUser = await User.findOne({"photos._id":req.params.id});
	res.render("photos/edit.ejs", {
		"photo": foundPhoto,
		"users": allUsers,
		"photoUser": foundPhotoUser
	})
});

router.put("/:id", async (req, res) => {
	try {
		const updatedPhoto = await Photo.findByidAndUpdate(req.params.id);
		const foundUser = await User.findOne({"photos._id":req.params.id});
		if (foundUser._id.toString() !== req.body.userId) {
			foundUser.Photos.id(req.params.id).remove();
			const savedFoundUser = await foundUser.save();
			const newUser = await User.findById(req.body.userId);
			newUser.photos.push(updatedPhoto);
			const savedNewuser = await newUser.save()
			res.redirect("/photos/"+req.params.id);
		} else {
			foundUser.photos.id(req.params.id).remove();
			foundUser.photos.push(updatedPhoto);
			const data = await foundUser.save()
			res.redirect("/photos/"+req.params.id);
			res.redirect("/photos/"+req.params.id);
		}
	} catch (err) {
		res.send(err)
	}
});

module.exports = router;