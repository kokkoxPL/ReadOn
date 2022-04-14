const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    desc: String,
    imgLink: String,
    tags: Array,
    imgDeleteHash: String,
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;