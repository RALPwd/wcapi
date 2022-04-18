const playerM = require("./player.model");
const bcrypt = require("bcrypt");

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

async function updatePlayerPassword(gamer, newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    gamer.password = hash;
    return await playerM.findOneAndUpdate(
      { email: gamer.email },
      { $set: gamer }
    );
  } catch (error) {
    console.log("Error : ", error);
  }
}

async function changePasswordPlayer(player) {
  return await playerM.findByIdAndUpdate({ _id: player._id }, player);
}

module.exports = {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
  updatePlayer,
<<<<<<< HEAD
  findOnePlayer,
  deletePlayer,
  changePasswordPlayer,
=======
  changePasswordPlayer,
  updatePlayerPassword,
>>>>>>> ff5d5d1 (Feature  change Password)
};
