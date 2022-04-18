require("dotenv").config();

const express = require("express");

const configExpress = require("./config/express");
const routes = require("./routes");
const connectDB = require("./config/database");

const app = express();

connectDB();
configExpress(app);
routes(app);

module.exports = app;
