require('dotenv').config();

const express = require('express');

const configExpress = require('./config/express');
const routes = require('./routes');
const connectDB = require('./config/database');

const app = express();

connectDB();
configExpress(app);
routes(app);

const port = process.env.PORT || 65535;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`)
})