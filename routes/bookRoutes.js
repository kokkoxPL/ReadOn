const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.get_index);

router.route("/books")
    .get(bookController.get_books_title)
    .post(bookController.post_books)

router.get("/book/:id", bookController.get_book_id);

module.exports = router;