const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const db = require("./src/models");

const app = express();
const corsOptions = {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,x-access-token,Origin,Accept,Authorization,X-Requested-With"
};
global.__basedir = __dirname;

app.set('port', (process.env.PORT || 5000));
app.use(cors(corsOptions));
app.use(bodyParser.json());


db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

app.get('/', function (request, response) {
    const result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

const initRoutes = require("./src/routes");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
