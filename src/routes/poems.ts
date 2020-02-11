import * as express from 'express';
import router from 'express';

import * as dotenv from "dotenv";

dotenv.config();
//Import the mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB = process.env.DB;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

router.get("/", function(req, res, next) {
  db.collection("poems")
    .find({})
    .sort({ title: 1 })
    .toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Poem not found");
      return res.send(result);
    });
});

router.get("/category-links", function(res) {
   db.collection("poems").distinct("category").toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Poem not found");
      return res.send(result);
   });
});

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
    .find({ category: req.params.cat })
    .sort({ title: 1 })
    .toArray(function(err, result) {
      if (err) return res.status(500).send("Woops something went wrong");
      if (!result.length) return res.status(404).send("Category not found");
      return res.send(result);
    });
});

export default router;