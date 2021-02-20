const jwt = require("jsonwebtoken");
const fs = require("fs");

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    const privateKey = fs.readFileSync(__basedir + "/src/config/private.key");
    jwt.verify(token, privateKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;
