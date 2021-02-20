const express = require("express");
const router = express.Router();

const { authcontroller, filecontroller, usercontroller } = require("../controllers");
const { verifySignUp, authJwt } = require("../middlewares");
const { verifyToken } = authJwt;

const routes = (app) => {
    //File Upload Routes
    router.post("/upload", verifyToken, filecontroller.upload);
    router.get("/files", verifyToken, filecontroller.getListFiles);
    router.get("/files/:name", verifyToken, filecontroller.downloadFile);
    router.delete("/files/:name", verifyToken, filecontroller.deleteFile);

    //Auth Routes
    router.post("/api/auth/signin", authcontroller.signIn);
    router.post("/api/auth/signup", verifySignUp.checkEmail, authcontroller.signUp);

    //Access Routes
    router.get("/api/auth/user", verifyToken, usercontroller.userBoard);

    // Not in use
    // router.post("/api/records", rcontroller.createRecord);
    // router.get("/api/records", rcontroller.findAllRecord);
    // router.get("/api/records/:id", rcontroller.findRecord);
    // router.put("/api/records/:id", rcontroller.updateRecord);
    // router.delete("/api/records/:id", rcontroller.deleteRecord);
    // router.delete("/api/records/", rcontroller.deleteAllRecord);

    app.use(router);
};

module.exports = routes;
