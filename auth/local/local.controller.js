const { getPlayerEmail } = require("../../api/player/player.service");
const { signToken } = require("../auth.services");

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

    const token = signToken(player.profile);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = { handlePlayerLogin };
