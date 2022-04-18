const { Router } = require("express");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
} = require("./player.controller");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.put("/", handlerRutaPutEditionById);

module.exports = router;
