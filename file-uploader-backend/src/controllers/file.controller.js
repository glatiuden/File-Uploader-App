const fs = require("fs");
const uploadFile = require("../middlewares/upload");

const baseUrl = "https://file-uploader-backend.herokuapp.com/files/";

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "No files are selected." });
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = `${__basedir}/resources/static/assets/uploads/${req.userId}/`;
    try {
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                res.status(500).send({
                    message: "Unable to scan files!",
                });
            }

            try {
                const fileInfos = [];
                files.forEach((file) => {
                    const stats = fs.statSync(directoryPath + file);
                    fileInfos.push({
                        name: file,
                        url: baseUrl + file,
                        date: stats.mtime
                    });
                });
                res.status(200).send(fileInfos);
            } catch (error) {
                // res.status(500).send({
                //     message: `No files found. ${err}`,
                // });
            }
        });
    } catch (err) {
        res.status(500).send({
            message: `Directory does not exist. ${err}`,
        });
    }
};

const downloadFile = (req, res) => {
    const fileName = req.params.name.replace("%20", " ");
    console.log(fileName);
    const directoryPath = `${__basedir}/resources/static/assets/uploads/${req.userId}/`;
    try {
        res.download(directoryPath + fileName, fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not download the file. " + err,
                });
            }
        });
    } catch (err) {
        res.status(500).send({
            message: `Deletion Error. ${err}`,
        });
    }
};

const deleteFile = (req, res) => {
    const directoryPath = `${__basedir}/resources/static/assets/uploads/${req.userId}/${req.params.name}`;
    try {
        fs.unlinkSync(directoryPath);
        res.status(200).send(true);
    } catch (err) {
        res.status(500).send({
            message: `Deletion Error. ${err}`,
        });
    }
}

module.exports = {
    upload,
    getListFiles,
    downloadFile,
    deleteFile
};