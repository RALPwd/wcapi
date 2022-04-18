const crypto = require("crypto");
const { sendMailSendGrid } = require("../../utils/emails");

const {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
  updatePlayer,
  updatePlayerPassword,
} = require("./player.service");

async function handleGetAllplayer(req, res) {
  const player = await getAllPlayer();
  res.status(200).json(player);
}

async function handleCreatePlayer(req, res) {
  try {
    const emailVerification = await getPlayerEmail(req.body.email);

    if (emailVerification.email) {
      return res.status(400).json({ status: 400, message: "email is used" });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(req.body.email)
      .digest("hex");
    const player = {
      ...req.body,
      picture: "https://i.imgur.com/I2aG4PJ.png",
      state: 0,
      gamePlayed: 0,
      gameWon: 0,
      passwordResetToken: tokenHash,
      passwordResetExpires: Date.now() + 3600000 * 24,
    };

    const email = {
      from: '"no reply 👻" <dayanalexismanrique@hotmail.com>',
      to: player.email,
      subject: "Activate your account WORD COMBAT",
      template_id: "d-79b85ada3a46413281c2d92261edffef",
      dynamic_template_data: {
        name: player.name,
        subject:
          "este correo es para verificar tu cuentra de wordcombat porfavor no responder",
        url: `http://localhost:3000/activate/${tokenHash}`,
      },
    };

    await sendMailSendGrid(email);

    const playerCreated = await createPlayer(player);
    return res.status(201).json(playerCreated);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlerRutaPutEditionById(req, res) {
  const bdy = req.body;
  await updatePlayer(bdy);
  res.status(200).json({ message: "Profile updated " });
}

async function handlerRutaPutChangePassword(req, res) {
  const objeto = req.body;
  const player = getPlayerEmail(req.body.email);

  if (player.comparePassword(req.body.oldpassword)) {
    const plyact = updatePlayer(objeto);
    res.status(200).json(plyact);
  } else {
    console.log("Old passwords doesn't match");
    res.status(406).json("Old passwords doesn't match");
  }
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

async function handlerRutaPutChangePassword(req, res) {
  const player = await getPlayerEmail(req.body.email);
  const validation = await player.comparePassword(req.body.oldpassword);

  if (validation) {
    const { _id, password } = req.body;
    const plyact = await updatePlayerPassword(player, password);
    res.status(200).json(plyact);
  } else {
    res.status(406).json("Old password doesn't match");
  }
}

module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
};
