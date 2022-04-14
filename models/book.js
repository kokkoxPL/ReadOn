const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    desc: String,
    imgLink: String,
    tags: String,
    imgDeleteHash: String,
});

const Books = mongoose.model("books", bookSchema);
module.exports = Books;
