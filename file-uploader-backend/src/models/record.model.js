const mongoose = require("mongoose");
const toJSON = require("./model.helper");

const schema = mongoose.Schema(
    {
        fileName: String,
        fileUrl: String,
        userId: String
    },
    { timestamps: true }
);

schema.method("toJSON", toJSON);

const Record = mongoose.model("record", schema);

module.exports = Record;
