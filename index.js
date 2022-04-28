const { server } = require("./app");

const port = process.env.PORT || 65535;

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});

module.exports = server;
