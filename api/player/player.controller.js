const crypto = require("crypto");
const { sendMailSendGrid } = require("../../utils/emails");

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
  try {
    const emailVerification = await getPlayerEmail(req.body.email)

      if(emailVerification){
       return res.status(400).json({status:400,message:"email is used"});
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
   return  res.status(201).json(playerCreated);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlerRutaPutEditionById(req, res) {
  const bdy = req.body;
  await updatePlayer(bdy);
  res.status(200).json({ message: "Profile updated " });
}


module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
};
