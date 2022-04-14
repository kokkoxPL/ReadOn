const Book = require("../models/book");

const post_books = (req, res) => {
    res.redirect("/books/" + req.body.title)
};

const get_books_title = (req, res) => {
    const reg = new RegExp(req.params.title, "i");
    Book.find({ title: { $in: reg } })
        .sort({ title: 1 })
        .then((result) => res.render("books", { books: result }))
        .catch((err) => res.render("404", { err }));
};

const get_book_id = (req, res) => {
    Book.findById(req.params.id).then((result) => {
        res.render("book", { book: result });
    });
};

module.exports = {
    post_books,
    get_books_title,
    get_book_id
};