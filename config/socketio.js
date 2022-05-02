const socketio = require("socket.io");
const { createGame } = require("../api/game/game.service");
const socket = {};

function connectSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  socket.io = io;

  let players = {};
  /*CHAT*/
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

    /*END CHAT*/

    /*MULTIPLAYER LOGIC*/

    io.emit("cantidadPlayers", Object.keys(players).length);

    socket.on("agregarPlayers", async (player) => {
      players[socket.id] = player;
      io.emit("cantidadPlayers", Object.keys(players).length);
      if (Object.keys(players).length === 2) {
        const socketIds = Object.values(players);
        const player1 = socketIds[0];
        const player2 = socketIds[1];
        const game = {
          playerOneId: player1._id,
          playerTwoId: player2._id,
          winnerId: null,
          wordToGuess: null,
          attemptsPlayer1: [],
          attemptsPlayer2: [],
        };

        const grameCreation = await createGame(game);
        io.emit("createGame", grameCreation._id);
        io.emit(`${grameCreation._id}`, { player1, player2 });
        const deleteid = Object.keys(players);
        delete players[deleteid[0]];
        delete players[deleteid[1]];
        io.emit("cantidadPlayers", Object.keys(players).length);
      }
    });

    socket.on("quitarEmprejamiento", (socketid) => {
      delete players[socketid];
      io.emit("cantidadPlayers", Object.keys(players).length);
    });

    /* END MULTIPLAYER LOGIC */

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
