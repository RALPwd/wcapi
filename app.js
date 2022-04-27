require("dotenv").config();

const express = require("express");

const configExpress = require("./config/express");
const routes = require("./routes");
const connectDB = require("./config/database");
const serverIoCreation = require("./config/socketio");
const app = express();

connectDB();
serverIoCreation(app);
configExpress(app);
routes(app);

module.exports = app;
