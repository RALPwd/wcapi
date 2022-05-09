const socketio = require("socket.io");
const { createGame } = require("../api/game/game.service");
const socket = {};
const randomWords = require("random-words-es");

function connectSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  socket.io = io;

  let players = {};
   let playersFriend = {};
  /*CHAT*/
  io.on("connection", (socket) => {
    let playerName;
    socket.on("conectado", (nombre) => {
      playerName = nombre;
      // const dataToSubmit = {
      //   message: "se ha conectado",
      //   author: nombre,
      // };
      // io.emit("mensajes", dataToSubmit);
    });

    socket.on("mensaje", (dataT) => {
      io.emit(`${dataT.typeChat}`, dataT.dataToSubmit);
    });

    /*END CHAT*/

    /*MULTIPLAYER LOGIC*/

    io.emit("cantidadPlayers", Object.keys(players).length);

    let idGame;

    

    socket.on("agregarPlayers", async (player) => {
      players[socket.id] = player;
      io.emit("cantidadPlayers", Object.keys(players).length);
      if (Object.keys(players).length === 2) {
        const socketIds = Object.values(players);
        const player1 = socketIds[0];
        const player2 = socketIds[1];
        let word;
        do {
          [word] = randomWords({ exactly: 1, maxLength: 5 });
        } while ([...word].length < 5);
        word = word.toUpperCase();
        const game = {
          playerOneId: player1._id,
          playerTwoId: player2._id,
          winnerId: null,
          wordToGuess: word,
          attemptsPlayer1: [],
          attemptsPlayer2: [],
        };

        const gameCreation = await createGame(game);

        idGame = gameCreation._id;
        io.emit("createGame", { idGame, word ,player1, player2 });
        io.emit(`${gameCreation._id}`, { player1, player2 });
        const deleteid = Object.keys(players);
        delete players[deleteid[0]];
        delete players[deleteid[1]];
        io.emit("cantidadPlayers", Object.keys(players).length);
      }
    });

    socket.on("emitTurn", (data) => {
      io.emit("emitTurn", data);
    });

    socket.on("quitarEmprejamiento", (socketid) => {
      delete players[socketid];
      io.emit("cantidadPlayers", Object.keys(players).length);
    });

    /* END MULTIPLAYER LOGIC */

    /*MACHMAKIN FRIEND */

    socket.on('emparejamientoamigo', async ({data,code,type})=>{
      if(type==='create'){
        playersFriend[socket.id] = {jugador:data,code}; 
      }
      if(type==='join'){
        const socketIds = Object.values(playersFriend);
        //Para el control z
          if(socketIds.find((arrayCode) => arrayCode.code === code))
          {
            playersFriend[socket.id] = {jugador:data,code}; 
            const socketIds2 = Object.values(playersFriend);
            const filtetPlayers2 = socketIds2.filter(codearray => codearray.code===code)
             if (filtetPlayers2.length === 2) {
              const player1 = filtetPlayers2[0];
              const player2 = filtetPlayers2[1];     
                let word;
              do {
                [word] = randomWords({ exactly: 1, maxLength: 5 });
              } while ([...word].length < 5);
              word = word.toUpperCase();
              const game = {
                playerOneId: player1.jugador._id,
                playerTwoId: player2.jugador._id,
                winnerId: null,
                wordToGuess: word,
                attemptsPlayer1: [],
                attemptsPlayer2: [],
              };

              const gameCreation = await createGame(game);

              idGame = gameCreation._id;
              io.emit("createGame", { idGame, word , player1:player1.jugador, player2:player2.jugador});
              io.emit(`${gameCreation._id}`, { player1:player1.jugador, player2:player2.jugador });
              const deleteid = Object.keys(playersFriend);
              delete playersFriend[deleteid[0]];
              delete playersFriend[deleteid[1]];  
              
              io.emit('emparejamientoamigo' ,{idgame:idGame,menssaje:'creada'})
          }
         
             }
          else{
              io.emit('emparejamientoamigo' ,{menssaje:'Error, verifíca el código'})
          }   
    
      }

    })
    socket.on("quitarEmprejamientoFriend", (socketid) => {
      delete playersFriend[socketid];
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
