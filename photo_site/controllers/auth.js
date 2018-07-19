console.log("auth.js is running...");


const express = require("express");
const router = express.Router();
const User = require("../models/users");


router.get("/", (req, res) => {
	res.render("auth/login.ejs", {

	});
});


router.post("/login", (req, res) => {
	req.session.loggedIn = true;
	req.session.username = req.body.username;
	res.redirect("/");
});


router.get("/logout", (req, res) => {
	req.sessions.destroy((err) => {
		if (err) {
			res.send("Error destroying session")
		} else {
			res.redirect("/auth");
		}
	})
});

module.eports = router;