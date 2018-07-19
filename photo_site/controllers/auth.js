console.log("auth.js is running...");


const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");


router.get("/", (req, res) => {
	res.render("auth/login.ejs", {
		"message": req.session.message
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

module.exports = router;