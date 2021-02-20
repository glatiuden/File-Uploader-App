const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `${__basedir}/resources/static/assets/uploads/${req.userId}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;