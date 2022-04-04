const { Router } = require("express");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlePlayerLogin,
  handlerRutaPutEditionById,
} = require("./player.controller");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.post("/email/", handlePlayerLogin);
router.put("/", handlerRutaPutEditionById);

module.exports = router;
