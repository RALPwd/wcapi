const playerM = require("./player.model");

async function getAllPlayer() {
  const players = await playerM.find();
  return players;
}

async function createPlayer(playeJson) {
  const newPlayer = await playerM.create(playeJson);
  return newPlayer;
}

async function getPlayerEmail(email) {
  const player = await playerM.findOne({ email });
  return player;
}

async function updatePlayer(body) {
  return await playerM.findByIdAndUpdate({ _id: body._id }, { $set: body });
}

module.exports = { getAllPlayer, createPlayer, getPlayerEmail, updatePlayer };
