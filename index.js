const app = require("./app");

const port = process.env.PORT || 65535;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});

module.exports = app;
