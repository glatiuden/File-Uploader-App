const db = require("../models");
const User = db.user;

exports.userBoard = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email
        });
    });
};
