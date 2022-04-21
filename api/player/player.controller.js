const crypto = require("crypto");
const fs = require("fs");
const { sendMailSendGrid } = require("../../utils/emails");
const cloudinary = require("cloudinary").v2;

const {
  getAllPlayer,
  createPlayer,
  getPlayerEmail,
  updatePlayer,
  updatePlayerPassword,
  getPlayerNick,
} = require("./player.service");

async function handleGetAllplayer(req, res) {
  const player = await getAllPlayer();
  res.status(200).json(player);
}

async function handleCreatePlayer(req, res) {
  try {
    const emailVerification = await getPlayerEmail(req.body.email);

    if (emailVerification) {
      return res.status(400).json({ status: 400, message: "Este correo ya está registrado" });
    }

    const nickVerification = await getPlayerNick(req.body.nick.toLowerCase());

    if (nickVerification) {
      return res.status(400).json({ status: 400, message: "Este nick ya está registrado" });
    }
        
    if(req.body.password.length < 6){
      return res.status(400).json({ status: 400, message: "La contraseña debe tener al menos 6 caracteres" });
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
        // url: `${process.env.VERSEL_FRONTEND}${tokenHash}`,
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
  const bdy = {...req.body };
  await updatePlayer(bdy);
  res.status(202).json({ status: 202, message: "El perfil ha sido actualizado" });
}

async function handlerRutaPutChangePassword(req, res) {
   const player = await getPlayerEmail(req.body.email);
   const validation = await player.comparePassword(req.body.oldpassword);

   if (validation) {
     const { password } = req.body;
     const plyact = await updatePlayerPassword(player, password);
     res.status(200).json({ message: "The password have been update sucessfully" });
   } else {
     res.status(406).json("The Old password doesn't match");
   }
}

async function handlerUpdateAvatar(req, res) {
  async function uploadImage(image){
    try {
      const result = await cloudinary.uploader.upload(image);
      const player = { ...req.player._doc, picture: result.url };
      await updatePlayer(player);
      fs.unlink(image, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    } catch (error) {
      console.log(error);
    }
  };
  uploadImage(req.file.path);
  res.status(200).json({ message: "The avatar has been update sucessfully" });
}


module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
  handlerUpdateAvatar,
};
