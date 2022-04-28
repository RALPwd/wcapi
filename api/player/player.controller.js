const crypto = require("crypto");
const fs = require("fs");
const { sendMailSendGrid } = require("../../utils/emails");
const cloudinary = require("cloudinary").v2;
const {
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
async function handleSession(req, res) {
  try {
    return res.status(200).json({
      status: 200,
      message: "Este correo ya está registrado",
      ...req.player,
    });
  } catch (error) {}
}

async function handleCreatePlayer(req, res) {
  try {
    const emailVerification = await getPlayerEmail(req.body.email);

    if (emailVerification) {
      return res
        .status(400)
        .json({ status: 400, message: "Este correo ya está registrado" });
    }

    const nickVerification = await getPlayerNick(req.body.nick.toLowerCase());

    if (nickVerification) {
      return res
        .status(400)
        .json({ status: 400, message: "Este nick ya está registrado" });
    }

    if (req.body.password.length < 6) {
      return res.status(400).json({
        status: 400,
        message: "La contraseña debe tener al menos 6 caracteres",
      });
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
        url: `${process.env.VERSEL_FRONTEND}${tokenHash}`,
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
  const bdy = { ...req.body };
  await updatePlayer(bdy);
  res
    .status(202)
    .json({ status: 202, message: "El perfil ha sido actualizado" });
}

async function handlerRutaPutChangePassword(req, res) {
  try {
    const player = req.player;
    const validation = await player.comparePassword(req.body.oldpassword);

    if (validation) {
      const { password } = req.body;
      const plyact = await updatePlayerPassword(player, password);
      res.status(200).json({
        status: 200,
        message: "la contrasena se actualizo correctamente",
      });
    } else {
      res
        .status(406)
        .json({ status: 406, message: "la contrasena no coincide" });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: 500, message: "error no previsto" });
  }
}

async function handlerUpdateAvatar(req, res) {
  async function uploadImage(image) {
    try {
      const result = await cloudinary.uploader.upload(image);
      const player = { ...req.player._doc, picture: result.url };
      await updatePlayer(player);
      fs.unlink(image, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    } catch (error) {
      console.log(error);
    }
  }
  uploadImage(req.file.path);
  res.status(200).json({ message: "The avatar has been update sucessfully" });
}

async function handlerRutaPutRecoveryPassword(req, res) {
  function genPassRandom(nCar) {
    let newPass = 0;
    for (i = 1; i <= nCar; i++) {
      const dgt = Math.round(Math.random() * 10);
      newPass += "" + dgt;
    }

    return newPass;
  }

  const player = await getPlayerEmail(req.body.email);

  if (player) {
    const bthBdy = new Date(req.body.birthday + "T00:00:00.000Z");
    const bthPly = new Date(player.birthday);
    if (bthPly.getTime() == bthBdy.getTime() && player.nick === req.body.nick) {
      const np = genPassRandom(Math.round(Math.random() * 10) + 6);
      const plyact = await updatePlayerPassword(player, np);
      //Envío de correo con nuevo pasword temporal.
      const email = {
        from: '"no reply 👻" <dayanalexismanrique@hotmail.com>',
        to: player.email,
        subject: "Recovery your account WORD COMBAT password",
        template_id: "d-a894e3711ec047089b8056a786400dbd",
        dynamic_template_data: {
          name: player.nick,
          password: np,
        },
      };
      await sendMailSendGrid(email);
      res.status(200).json({
        status: 202,
        message: "Se ha enviado un correo con el nuevo password",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Los datos de fecha de nacimiento y/o nick no corresponden.",
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "El usuario no aparece registrado en el sistema.",
    });
  }
}

module.exports = {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
  handlerUpdateAvatar,
  handleSession,
  handlerRutaPutRecoveryPassword,
};
