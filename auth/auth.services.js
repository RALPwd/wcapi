const jsonwebtoken = require("jsonwebtoken");
const compose = require("composable-middleware");
const { getPlayerEmail } = require("../api/player/player.service");

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, "secret_token");
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function isAuthenticated(req, res, next) {
  return compose().use(async (req, res, next) => {
    const autHeader = req.headers.authorization;

    if (!autHeader) {
      return res.status(401).end();
      //res.redirect("http://localhost:3000/");
    }
    const [, token] = autHeader.split(" ");
    const payload = await validateToken(token);

    if (!payload) {
      return res.status(401).end();
    }
    const player = await getPlayerEmail(payload.email);

    if (!player) {
      console.log(payload);
      return res.status(401).end();
    }

    req.player = player;
    next();
    return null;
  });
}

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, "secret_token", { expiresIn: "2h" });
  return token;
}

module.exports = {
  isAuthenticated,
  signToken,
};
