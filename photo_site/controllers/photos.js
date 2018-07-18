console.log("controllers/photos.js is running...");


// Required npm modules
const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");
const User = require("../models/users");


// Index Route
router.get("/", (req, res) => {
	Photo.find({}, (err, allPhotos) => {
			res.render("photos/index.ejs", {
				"photos": allPhotos
			})
	})
});


// New Route
router.get("/new", (req, res) => {
	User.find({}, (err, allUsers) => {
		res.render("photos/new.ejs", {
			"users": allUsers
		});
	})
});

router.post("/", (req, res) => {
	User.findById(req.body.userId, (err, foundUser) => {
		Photo.create(req.body, (err, newPhoto) => {
			foundUser.photos.push(newPhoto);
			foundUser.save((err, data) => {
				res.redirect("/photos");
			})
		})
	})
});


// Show Route
router.get("/:id", (req, res) => {
	Photo.findById(req.params.id, (err, shownPhoto) => {
		User.findOne({"photos._id": req.params.id}, (err, foundUser) => {
			res.render("photos/show.ejs", {
				"photo": shownPhoto,
				"user": foundUser
			})
		})
	})
});


// Delete Route
router.delete("/:id", (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		User.findOne({"photos._id":req.params.id}, (err, foundUser) => {
			foundUser.photos.id(req.params.id).remove();
			foundUser.save((err, data) => {
				res.redirect("/photos");
			})
		})
	})
});


// Edit Route
router.get("/:id/edit", (req, res) => {
	Article.findById(req.params.id, (err, foundPhoto) => {
		User.find({}, (err, allUsers) => {
			User.findOne({"photos._id":req.params.id}, (err, foundPhotoUser) => {
				res.render("photos/edit.ejs", {
					"photo": foundPhoto,
					"users": allUsers,
					"photoUser": foundPhotoUser
				})
			})
		})
	})
});

router.put("/:id", (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto) => {
		User.findOne({"photos._id":req.params.id}, (err, foundUser) => {
			if (foundUser._id.toString() !== req.body.userId) {
				foundUser.articles.id(req.params.id).remove();
				foundUser.save((err, savedFoundUser) => {
					User.findById(req.body.userId, (err, newUser) => {
						newUser.photos.push(updatedPhoto);
						newUser.save((err, savedNewUser) => {
							res.redirect("/photos/"+req.params.id);
						})
					})
				})
			} else {
				foundUser.photos.id(req.params.id).remove();
				foundUser.photos.push(updatedPhoto);
				foundUser.save((err, data) => {
					res.redirect("/photos/"+req.params.id);
				})
			}
		})
	})
});


module.exports = router;