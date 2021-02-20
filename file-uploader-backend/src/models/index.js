const mongoose = require('mongoose');

const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    record: require("./record.model"),
    url: dbConfig.CLOUD_URL,
    user: require("./user.model")
};

module.exports = db;
