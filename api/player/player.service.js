const playerM = require("./player.model");
const bcrypt = require("bcrypt");

async function createPlayer(playeJson) {
  const newPlayer = await playerM.create(playeJson);
  return newPlayer;
}

async function getPlayerEmail(email) {
  const player = await playerM.findOne({ email });
  return player;
}

async function getPlayerNick(nick) {
  const player = await playerM.findOne({ nick });
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
      { $set: gamer },
    );
  } catch (error) {
    console.log("Error : ", error);
  }
}

module.exports = {
  createPlayer,
  getPlayerEmail,
  updatePlayer,
  findOnePlayer,
  deletePlayer,
  updatePlayerPassword,
  getPlayerNick,
};
