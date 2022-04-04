const res = require("express/lib/response");
const {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
} = require("./player.service");

async function handleGetAllplayer(req, res) {
  const player = await getAllPlayer();
  res.status(200).json(player);
}

async function handleCreatePlayer(req, res) {
  const player = {
    ...req.body,
    picture: "https://i.imgur.com/I2aG4PJ.png",
    state: 0,
    gamePlayed: 0,
    gameWon: 0,
  };
  try {
    const playerCreated = await createPlayer(player);
    res.status(201).json(playerCreated);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handleGetLoginEmail(req, res) {
  const { email } = req.body;
  const PlayerEmail = await getPlayerEmail(email);

  if (!PlayerEmail) {
    return res.status(404).json({ error: "correo no encontrado" });
  }

  return res.status(200).json(PlayerEmail);
}

module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handleGetLoginEmail,
};
