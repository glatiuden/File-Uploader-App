const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

const signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    });
}

const signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const isValidPW = bcrypt.compareSync(req.body.password, user.password);
        if (!isValidPW) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }

        const privateKey = fs.readFileSync(__basedir + "/src/config/private.key");
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, privateKey, {
            algorithm: 'RS256',
            expiresIn: 86400
        });

        res.status(200).send({
            accessToken: token
        });
    });
};

module.exports = {
    signUp,
    signIn
};