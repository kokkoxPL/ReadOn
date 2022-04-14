const Book = require("../models/book");
const Tag = require("../models/tag");
const fetch = require("node-fetch");
const formData = require("form-data");
const crypto = require("crypto");

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

const hash = (password) => crypto.createHash("sha256").update(password).digest("base64");

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

const get_admin_login = (req, res) => {
    if (req.isVerified) {
        res.redirect("/admin");
    } else {
        res.render("login");
    }
};

const post_admin_login = (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.sendStatus(400);
    }
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.sendStatus(401);
    }
    const passHash = hash(password);
    res.cookie("access_token", passHash);
    res.redirect("/admin");
};

const get_admin_new = (req, res) => {
    if (req.isVerified) {
        Tag.find()
            .sort({ name: 1 })
            .then((result) => {
                const msg = req.msg;
                res.render("adminNew", { msg, tags: result });
            })
            .catch((err) => res.render("404", { err }));
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
        console.log(data);
        const book = new Book(data);
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
                Tag.find()
                    .sort({ name: 1 })
                    .then((resultTags) => {
                        const msg = req.msg;
                        res.render("adminEditBook", { msg: req.msg, book: result, tags: resultTags });
                    })
                    .catch((err) => res.render("404", { err }));
            })
            .catch((err) => {
                res.render("404", { err });
            });
    }
};

const post_admin_edit_id = async (req, res) => {
    if (req.isVerified) {
        const data = req.body;
        if (req.file) {
            const buffer = req.file.buffer;
            const imgurResponse = await uploadImageToImgur(buffer);
            if (imgurResponse.success === true) {
                data.imgLink = imgurResponse.data.link;
                data.imgDeleteHash = imgurResponse.data.deletehash;
            } else {
                return res.redirect("/admin/edit?msg=3");
            }
        }
        Book.findOneAndUpdate({ _id: req.params.id }, data)
            .then((previousResult) => {
                res.redirect(`/admin/edit/${req.params.id}?msg=2`);
                if (previousResult.imgDeleteHash && req.file) {
                    deleteImageFromImgur(previousResult.imgDeleteHash).then((result) => {
                        if (result.success === false) {
                            console.log("Couldn't delete image after edit");
                        }
                    });
                }
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
        Book.findById(req.body.id).then((result) => {
            console.log(result);
            if (result.imgDeleteHash) {
                deleteImageFromImgur(result.imgDeleteHash).then((result) => {
                    if (result.success === false) {
                        console.log("Couldn't delete image");
                    }
                });
            }
            Book.findByIdAndDelete(req.body.id).then(() => {
                res.redirect("/admin/delete?msg=1");
            });
        });
    }
};

module.exports = {
    get_admin,
    get_admin_login,
    post_admin_login,
    get_admin_new,
    post_admin_new,
    get_admin_edit,
    get_admin_edit_id,
    post_admin_edit_id,
    get_admin_delete,
    post_admin_delete,
};
