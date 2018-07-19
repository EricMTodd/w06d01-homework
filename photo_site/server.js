console.log("server.js is running...");


// Required npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");


// Required database
require("./db/db");

// Setting up session
app.use(session({
	secret: "insert_subject_string_here",
	resave: false,
	saveUninitialized: false
}));

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// app.use((req, res, next) => {
// 	if (req.session.loggedIn === true ) {
// 		return next();
// 		} else {
// 			res.redirect("/auth");
// 		}
// });




// Required controllers for router
// Users controller
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

// Photos controller
const photosController = require("./controllers/photos.js");
app.use("/photos", photosController);

// Accounts controller
const accountsController = require("./controllers/auth");
app.use("/auth", accountsController);


// Home Route
app.get("/", (req, res) => {
	res.render("index.ejs", {
		"username": req.session.username
	})
});


// Listening for server
app.listen(3000, () => {
	console.log("server.js is listening on port 3000.");
});