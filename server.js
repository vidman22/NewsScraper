var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars")
var mongoose = require("mongoose");


var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

// require routes files and pass the router object
require("./config/routes.js")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {

  if (error) {
    console.log(error);
  }

  else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
