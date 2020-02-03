var mongoose = require("mongoose");

var poemSchema = new mongoose.Schema({
    title: String,
    category: String,
    body: String 
})

var poem = mongoose.model('Poem', poemSchema) 
module.exports = poem;