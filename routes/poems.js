var express = require("express");
var router = express.Router();

//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/geoffrey_whitehead";
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function(req, res, next) {
  db.collection("poems")
    .find({}).sort({'title': 1})
    .toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Poem not found"); 
      return res.send(result);
    });
})

router.get("/title/:title", function(req, res, next) {
  db.collection("poems")
    .find({ title: req.params.title })
    .toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Poem not found"); 
      return res.send(result);
    });
});

router.get("/category/:cat", function(req, res, next) {
  db.collection("poems")
    .find({ category: req.params.cat }).sort({'title': 1})
    .toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Category not found") 
      return res.send(result);
    });
})
module.exports = router;
