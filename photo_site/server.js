console.log("server.js is running...");


// Required npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fs = require("fs");

// Required database
require("./db/db");

// Required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


// Required controllers for router
// Users controller
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

// Photos controller
const photosController = require("./controllers/photos.js");
app.use("/photos", photosController);


// Home Route
app.get("/", (req, res) => {
	res.render("index.ejs")
});


// Listening for server
app.listen(3000, () => {
	console.log("server.js is listening on port 3000.");
});