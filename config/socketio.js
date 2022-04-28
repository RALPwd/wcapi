const socketio = require("socket.io");

const socket = {};

function connectSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });
  socket.io = io;

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
}

module.exports = { connectSocket, socket };
