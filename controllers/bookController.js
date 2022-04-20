const Book = require("../models/book");
const Tag = require("../models/tag");

function ensureArray(arg) {
    if (Array.isArray(arg)) {
        return arg;
    } else {
        return [arg];
    }
}

const get_index = (req, res, next) => {
    Book.find()
        .sort({ title: 1 })
        .limit(12)
        .then((result) => {
            Tag.find()
                .sort({ name: 1 })
                .then((resultTags) => res.render("index", { books: result, tags: resultTags }))
                .catch((err) => res.render("404", { err }));
        })
        .catch((err) => res.render("404", { err }));
};

const post_books = (req, res) => {
    res.redirect(`/books?q=${req.body.title}&tags=${ensureArray(req.body.tags).join(",")}`);
};

const get_books_title = (req, res) => {
    const reg = new RegExp(req.query.q, "i");
    let query = {
        // Only title is inserted
        $or: [{ title: { $in: reg } }, { author: { $in: reg } }],
    };
    if (req.query.tags) {
        query = {
            $and: [
                {
                    $or: [{ title: { $in: reg } }, { author: { $in: reg } }],
                },
                {
                    tags: req.query.tags.split(","),
                },
            ],
        };
    }
    Book.find(query)
        .sort({ title: 1 })
        .then((result) => res.render("books", { books: result }))
        .catch((err) => res.render("404", { err }));
};

const get_book_id = (req, res) => {
    Book.findById(req.params.id).then((result) => res.render("book", { book: result }));
};

module.exports = {
    get_index,
    post_books,
    get_books_title,
    get_book_id,
};
