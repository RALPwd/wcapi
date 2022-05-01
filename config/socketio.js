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
        message: "se ha conectado",
        author: nombre,
      };
      io.emit("mensajes", dataToSubmit);
    });

    socket.on("mensaje", (dataToSubmit) => {
      io.emit("mensajes", dataToSubmit);
    });

    let gameId;

    socket.on("juego", (dataReceived) => {
      gameId = dataReceived._id;
      io.emit("juego", dataReceived);
    });

    socket.on(gameId, (dataReceived) => {
      console.log(dataReceived);
      io.emit(gameId, dataReceived);
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
