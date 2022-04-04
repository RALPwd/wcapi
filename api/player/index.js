const { Router } = require("express");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlePlayerLogin,
} = require("./player.controller");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.post("/email/", handlePlayerLogin);

module.exports = router;
