const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get("/", adminController.get_admin);

router.get("/new", adminController.get_admin_new);

router.post("/new", adminController.post_admin_new);

router.get("/edit", adminController.get_admin_edit);

router.get("/edit/:id", adminController.get_admin_edit_id);

router.post("/edit/:id", adminController.post_admin_edit_id);

router.get("/delete", adminController.get_admin_delete);

router.post("/delete", adminController.post_admin_delete);

module.exports = router;