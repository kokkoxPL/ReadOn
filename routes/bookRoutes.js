const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.get_index);
router.post("/book", bookController.post_books);
router.get("/books/:title", bookController.get_books_title);
router.get("/book/:id", bookController.get_book_id);

module.exports = router;