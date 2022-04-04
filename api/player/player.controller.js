const res = require("express/lib/response");
const {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
  updatePlayer,
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

// async function handleGetLoginEmail(req, res) {
//   const { email } = req.body;
//   const PlayerEmail = await getPlayerEmail(email);

//   if (!PlayerEmail) {
//     return res.status(404).json({ error: "correo no encontrado" });
//   }

//   return res.status(200).json(PlayerEmail);
// }

async function handlerRutaPutEditionById(req, res) {
  const bdy = req.body;
  await updatePlayer(bdy);
  res.status(200).json({ message: "Profile updated " });
}

async function handlePlayerLogin(req, res) {
  const { email, password } = req.body;

  try {
    const player = await getPlayerEmail(email);

    if (!player) {
      return res
        .status(401)
        .json({ message: "Invalid email please check again " });
    }

    const isMatch = await player.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password please check again " });
    }

    return res.status(200).json(player);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handlePlayerLogin,
  handlerRutaPutEditionById,
};
