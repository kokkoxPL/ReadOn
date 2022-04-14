const Book = require("../models/book");
const fetch = require("node-fetch");
const formData = require("form-data");

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

const get_admin = (req, res) => {
    if (req.isVerified) {
        Book.find()
            .sort({ title: 1 })
            .then((result) => res.render("admin", { books: result }))
            .catch((err) => res.render("404", { err }));
    } else {
        res.redirect("/login");
    }
};

const get_admin_new = (req, res) => {
    if (req.isVerified) {
        const msg = req.msg;
        res.render("adminNew", { msg });
    } else {
        res.redirect("/login");
    }
};

const post_admin_new = async (req, res) => {
    if (req.isVerified) {
        const data = req.body;
        if (req.file) {
            const buffer = req.file.buffer;
            const imgurResponse = await uploadImageToImgur(buffer);
            if (imgurResponse.success === true) {
                data.imgLink = imgurResponse.data.link;
                data.imgDeleteHash = imgurResponse.data.deletehash;
            } else {
                return res.redirect("/admin/new?msg=3");
            }
        } else {
            data.imgLink = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cards-Blank.svg";
        }
        const book = new Book(req.body);
        book.save()
            .then((result) => res.redirect("/admin/new?msg=1"))
            .catch((err) => res.render("404", { err }));
    } else {
        res.redirect("/login");
    }
};

const get_admin_edit = (req, res) => {
    if (req.isVerified) {
        const msg = req.msg;
        Book.find()
            .then((result) => {
                console.log(result);
                res.render("adminEdit", { books: result, msg });
            })
            .catch((err) => res.render("404", { err }));
    } else {
        res.redirect("/login");
    }
};

const get_admin_edit_id = (req, res) => {
    if (req.isVerified) {
        Book.findById(req.params.id)
            .then((result) => {
                res.render("adminEditBook", { msg: req.msg, book: result });
            })
            .catch((err) => {
                res.render("404", { err });
            });
    }
};

const post_admin_edit_id = (req, res) => {
    if (req.isVerified) {
        Book.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect(`/admin/edit/${req.params.id}?msg=2`);
            })
            .catch((err) => {
                res.render("404", { err });
            });
    }
};

const get_admin_delete = (req, res) => {
    if (req.isVerified) {
        Book.find().then((result) => {
            res.render("adminDelete", { books: result });
        });
    }
};

const post_admin_delete = (req, res) => {
    if (req.isVerified) {
        Book.findByIdAndDelete(req.body.id).then(() => {
            res.sendStatus(200);
        });
    }
};

module.exports = {
    get_admin,
    get_admin_new,
    post_admin_new,
    get_admin_edit,
    get_admin_edit_id,
    post_admin_edit_id,
    get_admin_delete,
    post_admin_delete,
};
