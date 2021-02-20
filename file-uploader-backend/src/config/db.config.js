const DB = "file_uploader_db";
module.exports = {
    LOCAL_URL: `mongodb://localhost:27017/${DB}`,
    CLOUD_URL: `mongodb+srv://dbuser:9JrWJUDAXsJdLzK2@cluster0.6ol1n.mongodb.net/${DB}?retryWrites=true&w=majority`
};