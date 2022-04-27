const socketio = require("socket.io");
const http = require("http");

function serverIoCreation(app) {
  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    let playerName;
    socket.on("conectado", (nombre) => {
      playerName = nombre;
      const dataToSubmit = {
        message: "se a conectado",
        author: nombre,
      };
      io.emit("mensajes", dataToSubmit);
    });

    socket.on("mensaje", (dataToSubmit) => {
      io.emit("mensajes", dataToSubmit);
    });

    socket.on("disconnect", () => {
      const disconect = {
        message: "ha abandonado la sala",
        author: playerName,
      };
      io.emit("mensajes", disconect);
    });
  });

  server.listen(3001, () => console.log("servidor inicializado"));
}

module.exports = serverIoCreation;
