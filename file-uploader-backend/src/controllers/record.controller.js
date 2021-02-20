const db = require("../models");
const Record = db.record;

const createRecord = (req, res) => {
    if (!req.body.fileurl) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const record = new Record({
        fileName: req.body.filename,
        fileUrl: req.body.fileurl,
        userId: req.body.userid
    });

    record.save(record).then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the record."
            });
        });
};

const findAllRecord = (req, res) => {
    const filename = req.query.filename;
    const condition = filename ? { filename: { $regex: new RegExp(filename), $options: "i" } } : {};
    Record.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving records."
        });
    });
};

const findRecord = (req, res) => {
    const id = req.params.id;
    Record.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "No records found with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving record with id =" + id });
    });
};

const updateRecord = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to be updated cannot be empty!"
        });
    }

    const id = req.params.id;
    Record.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update record with id=${id}.`
                });
            } else res.send({ message: "Record was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating record with id=" + id
            });
        });
};

const deleteRecord = (req, res) => {
    const id = req.params.id;
    Record.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete record with id=${id}.`
            });
        } else {
            res.send({
                message: "Record was deleted successfully!"
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete record with id =" + id
            });
        });
};

const deleteAllRecord = (req, res) => {
    Record.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Records were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all records."
            });
        });
};

module.exports = {
    createRecord,
    findAllRecord,
    findRecord,
    updateRecord,
    deleteRecord,
    deleteAllRecord,
};