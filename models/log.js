const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
    {
        type: String, // Book added, book deleted, book edited, user logged in, etc.
        ip: String,
        data: Object,
    },
    {
        timestamps: {
            createdAt: "created_at",
        },
    }
);

const Log = mongoose.model("logs", logSchema);

module.exports = Log;
