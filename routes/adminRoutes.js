const express = require("express");
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer();

const router = express.Router();

router.route("/login")
    .get(adminController.get_admin_login)
    .post(adminController.post_admin_login);

router.all("*", adminController.is_admin);

router.get("/", adminController.get_admin);

router.route("/new")
    .get(adminController.get_admin_new_book)
    .post(upload.single("img"), adminController.post_admin_new_book);

router.get("/edit", adminController.get_admin_edit_books);

router.route("/edit/:id")
    .get(adminController.get_admin_edit_id_book)
    .post(upload.single("img"), adminController.post_admin_edit_id_book);

router.route("/delete")
    .get(adminController.get_admin_delete_book)
    .post(adminController.post_admin_delete_book);

router.route("/tags")
    .get(adminController.get_admin_tags)
    .post(adminController.post_admin_tags);

router.route("/password")
    .get(adminController.get_admin_password)
    .post(adminController.post_admin_password)

router.post("/deletetag", adminController.post_admin_tags_delete);

router.get("/logs", adminController.get_admin_error_logs);

router.get("/logout", adminController.get_admin_logout);

router.post("/clearLogs", adminController.clear_logs)

module.exports = router;
