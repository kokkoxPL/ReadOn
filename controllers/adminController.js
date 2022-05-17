const Book = require("../models/book");
const Tag = require("../models/tag");
const Error = require("../models/error");
const fetch = require("node-fetch");
const formData = require("form-data");
const crypto = require("crypto");

const hash = (password) => crypto.createHash("sha256").update(password).digest("base64");

async function uploadImageToImgur(buffer) {
    const data = new formData();
    data.append("image", buffer);
    const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
        body: data,
    });
    const json = await response.json();
    return json;
}

async function deleteImageFromImgur(deleteHash) {
    const response = await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
        method: "DELETE",
        headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
    });
    const json = await response.json();
    return json;
}

const is_admin = (req, res, next) => {
    if (req.isVerified) {
        next();
    } else {
        res.redirect("/admin/login");
    }
};

const get_admin = (req, res, next) => {
    Book.find()
        .sort({ title: 1 })
        .then((result) => res.render("admin", { books: result }))
        .catch((err) => next(err));
};

const get_admin_login = (req, res) => {
    if (req.isVerified)
        res.redirect("/admin");
    else
        res.render("login");
};

const post_admin_login = (req, res) => {
    const { password } = req.body;
    if (!password)
        return res.sendStatus(400);
    if (password !== process.env.ADMIN_PASSWORD)
        return res.sendStatus(401);

    res.cookie("access_token", hash(password));
    res.redirect("/admin");
};

const get_admin_new_book = (req, res, next) => {
    Tag.find()
        .sort({ name: 1 })
        .then((result) => res.render("adminNew", { msg: req.msg, tags: result }))
        .catch((err) => next(err));
};

const post_admin_new_book = async (req, res, next) => {
    const data = req.body;

    if (req.file) {
        const buffer = req.file.buffer;
        const imgurResponse = await uploadImageToImgur(buffer);

        if (imgurResponse.success === true) {
            data.imgLink = imgurResponse.data.link;
            data.imgDeleteHash = imgurResponse.data.deletehash;
        } else
            return res.redirect("/admin/new?msg=3");
    } else
        data.imgLink = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cards-Blank.svg";

    const book = new Book(data);

    book.save()
        .then((result) => res.redirect("/admin/new?msg=1"))
        .catch((err) => next(err));
};

const get_admin_edit_books = (req, res, next) => {
    Book.find()
        .then((result) => res.render("adminEdit", { books: result, msg: req.msg }))
        .catch((err) => next(err));
};

const get_admin_edit_id_book = (req, res, next) => {
    Book.findById(req.params.id)
        .then((result) => {
            Tag.find()
                .sort({ name: 1 })
                .then((resultTags) => res.render("adminEditBook", { msg: req.msg, book: result, tags: resultTags }))
                .catch((err) => next(err));
        })
        .catch((err) => next(err));
};

const post_admin_edit_id_book = async (req, res, next) => {
    const data = req.body;

    if (req.file) {
        const buffer = req.file.buffer;
        const imgurResponse = await uploadImageToImgur(buffer);

        if (imgurResponse.success === true) {
            data.imgLink = imgurResponse.data.link;
            data.imgDeleteHash = imgurResponse.data.deletehash;
        } else
            return res.redirect("/admin/edit?msg=3");
    }
    Book.findOneAndUpdate({ _id: req.params.id }, data)
        .then((previousResult) => {
            res.redirect(`/admin/edit/${req.params.id}?msg=2`);

            if (previousResult.imgDeleteHash && req.file) {
                deleteImageFromImgur(previousResult.imgDeleteHash).then((result) => {
                    if (result.success === false)
                        console.log("Couldn't delete image after edit");
                });
            }
        })
        .catch((err) => next(err));
};

const get_admin_delete_book = (req, res, next) => {
    Book.find()
        .then((result) => res.render("adminDelete", { books: result }))
        .catch((err) => next(err));
};

const post_admin_delete_book = (req, res, next) => {
    Book.findById(req.body.id).then((result) => {
        if (result.imgDeleteHash) {
            deleteImageFromImgur(result.imgDeleteHash).then((result) => {
                if (result.success === false)
                    console.log("Couldn't delete image");
            });
        }
        Book.findByIdAndDelete(req.body.id)
            .then(() => res.redirect("/admin/delete?msg=1"))
            .catch((err) => next(err));
    });
};

const get_admin_tags = (req, res, next) => {
    Tag.find()
        .then((results) => res.render("tagNew", { tags: results }))
        .catch((err) => next(err));
};

const post_admin_tags = (req, res, next) => {
    const { tagName } = req.body;
    const tag = new Tag({ name: tagName });
    tag.save()
        .then(() => res.redirect("/admin/tags"))
        .catch((err) => next(err));
};

const post_admin_tags_delete = (req, res, next) => {
    const { id } = req.body;
    Tag.findByIdAndDelete(id)
        .then(() => res.redirect("/admin/tags"))
        .catch((err) => next(err));
};

const get_admin_error_logs = (req, res, next) => {
    Error.find()
        .then((result) => res.render("errors", { errors: result }))
        .catch((err) => next(err));
};

const get_admin_logout = (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/");
};

module.exports = {
    is_admin,
    get_admin,
    get_admin_login,
    post_admin_login,
    get_admin_new_book,
    post_admin_new_book,
    get_admin_edit_books,
    get_admin_edit_id_book,
    post_admin_edit_id_book,
    get_admin_delete_book,
    post_admin_delete_book,
    get_admin_tags,
    post_admin_tags,
    post_admin_tags_delete,
    get_admin_error_logs,
    get_admin_logout,
};
