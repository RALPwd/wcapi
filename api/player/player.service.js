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

async function findOnePlayer(token) {
  const player = await playerM.findOne(token);
  return player;
}

async function deletePlayer(playerid) {
  await playerM.deleteOne(playerid);
  return "Player deleted";
}

async function changePasswordPlayer(player) {
  return await playerM.findByIdAndUpdate({ _id: player._id }, player);
}

module.exports = {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
  updatePlayer,
  findOnePlayer,
  deletePlayer,
  changePasswordPlayer,
};
