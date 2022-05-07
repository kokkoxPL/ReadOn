const Book = require("../models/book");
const Tag = require("../models/tag");

const findBooks = (page, search) => {
    return new Promise((resolve, reject) => {
        Book.find(search)
            .sort({ title: 1 })
            .skip(12 * (page - 1))
            .limit(12)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}

const findTags = () => {
    return new Promise((resolve, reject) => {
        Tag.find()
            .sort({ name: 1 })
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}

const find = async (page, search = {}) => {
    const books = findBooks(page, search);
    const tags = findTags();

    return {
        books: await books,
        tags: await tags,
    }
}

const get_index = async (req, res) => {
    const numberOfBooks = await Book.count();
    const pages = Math.ceil(numberOfBooks / 12);
    const currentPage = parseInt(req.query.page) || 1;

    const { books, tags } = await find(currentPage);

    res.render("index", { books, tags, pages, currentPage });
};

const post_books = (req, res) => {
    res.redirect(`/books?search=${req.body.title}&tags=${req.body.tags != null ? req.body.tags : "none"}`);
};

const get_books_title = async (req, res) => {
    const numberOfBooks = await Book.count();
    const pages = Math.ceil(numberOfBooks / 12);
    const currentPage = parseInt(req.query.page) || 1;

    const reg = new RegExp(req.query.search, "i");
    const tagsReg = req.query.tags.split(",");

    let search = { $or: [{ title: { $in: reg } }, { author: { $in: reg } }] };

    if (req.query.tags != "none")
        Object.assign(search, { tags: { $in: tagsReg } });

    const { books, tags } = await find(currentPage, search);

    res.render("index", { books, tags, pages, currentPage });
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
