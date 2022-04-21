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
const Log = require("./models/log");
const app = express();

const hash = (password) => crypto.createHash("sha256").update(password).digest("base64");

// mongoose
//     .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => )
//     .catch((err) => console.log(err));
app.listen(process.env.PORT)
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
    req.log = (type, data) => {
        const log = new Log({ type, data, ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress });
        log.save();
    };
    next();
});

app.set("view engine", "ejs");

//app.use(bookRoutes);

//app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.render("404");
});
