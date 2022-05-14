const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorSchema = new Schema(
    {
        path: String,
        err: String,
    },
    {
        timestamps: {
            createdAt: "created_at",
        },
    }
);

const Error = mongoose.model("errors", errorSchema);

module.exports = Error;