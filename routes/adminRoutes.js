const express = require("express");
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer();

const router = express.Router();

router.get("/", adminController.get_admin);

router.get("/login", adminController.get_admin_login);

router.post("/login", adminController.post_admin_login);

router.get("/new", adminController.get_admin_new_book);

router.post("/new", upload.single("img"), adminController.post_admin_new_book);

router.get("/edit", adminController.get_admin_edit_books);

router.get("/edit/:id", adminController.get_admin_edit_id_book);

router.post("/edit/:id", upload.single("img"), adminController.post_admin_edit_id_book);

router.get("/delete", adminController.get_admin_delete_book);

router.post("/delete", adminController.post_admin_delete_book);

router.get("/tags", adminController.get_admin_tags);

router.post("/tags", adminController.post_admin_tags);

router.post("/deletetag", adminController.post_admin_tags_delete);

router.get("/logs", adminController.get_admin_logs);

app.get("/logout", adminController.get_admin_logout);

module.exports = router;
