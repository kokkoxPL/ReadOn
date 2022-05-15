require("dotenv").config();
const compression = require("compression");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const adminRoutes = require("./routes/adminRoutes");
const bookRoutes = require("./routes/bookRoutes");
const Error = require("./models/error");
const app = express();

const hash = (password) => crypto.createHash("sha256").update(password).digest("base64");

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT))
    .catch((err) => console.log(err));

const msgs = {
    1: "Successfully printed a book",
    2: "Successfully reprinted a book",
    3: "Book cover couldn't be uploaded",
};

app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    req.isVerified = req.cookies.access_token == hash(process.env.ADMIN_PASSWORD);
    req.msg = req.query.msg && msgs[req.query.msg] ? msgs[req.query.msg] : "";
    next()
});

app.set("view engine", "ejs");

app.use(bookRoutes);

app.use("/admin", adminRoutes);

app.get("/404", (req, res) => {
    res.status(404).render("404");
});

app.use((err, req, res, next) => {
    console.log(err);
    const error = new Error({ path: req.originalUrl, err });
    error.save();
    res.status(404).render("404");
});
