const { Router } = require("express");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
} = require("./player.controller");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.put("/", handlerRutaPutEditionById);
router.put("/changepassword/", handlerRutaPutChangePassword);

module.exports = router;
