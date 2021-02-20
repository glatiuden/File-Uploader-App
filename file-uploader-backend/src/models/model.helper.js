const toJSON = (obj) => {
    const { __v, _id, ...object } = obj;
    object.id = _id;
    return object;
}

module.exports = toJSON;