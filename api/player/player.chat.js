const { socket } = require("../../config/socketio");

socket.io.on("connection", (soc) => {
  let playerName;
  soc.on("conectado", (nombre) => {
    playerName = nombre;
    const dataToSubmit = {
      message: "se a conectado",
      author: nombre,
    };
    socket.io.emit("mensajes", dataToSubmit);
  });

  soc.on("mensaje", (dataToSubmit) => {
    io.emit("mensajes", dataToSubmit);
  });

  soc.on("disconnect", () => {
    const disconect = {
      message: "ha abandonado la sala",
      author: playerName,
    };
    socket.io.emit("mensajes", disconect);
  });
});
