const mongoose = require("mongoose");
const toJSON = require("./model.helper");

const schema = mongoose.Schema(
    {
        email: String,
        name: String,
        password: String
    },
    { timestamps: true }
);

schema.method("toJSON", toJSON);

const User = mongoose.model("user", schema);

module.exports = User;