const playerM = require('./player.model');

async function getAllPlayer() {
  const players = await playerM.find();
  return  players
}

async function createPlayer(playeJson){
  const newPlayer = await playerM.create(playeJson)
  return newPlayer;
}

async function getPlayerEmail(email){
  const player = await playerM.findOne({ email });
  return player;
}

module.exports = { getAllPlayer ,createPlayer,getPlayerEmail};