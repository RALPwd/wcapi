const { Router } = require("express");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
} = require("./player.controller");

const { isAuthenticated } = require("../../auth/auth.services");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.put("/", isAuthenticated(), handlerRutaPutEditionById);
router.patch("/changepassword/",isAuthenticated(), handlerRutaPutChangePassword);

module.exports = router;
