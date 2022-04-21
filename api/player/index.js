const { Router } = require("express");
const multer = require("multer");
const {
  handleGetAllplayer,
  handleCreatePlayer,
  handlerRutaPutEditionById,
  handlerRutaPutChangePassword,
  handlerUpdateAvatar
} = require("./player.controller");

const upload = multer({ dest: "./temp" });

const { isAuthenticated } = require("../../auth/auth.services");

const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.put("/", isAuthenticated(), handlerRutaPutEditionById);
router.post("/upload", isAuthenticated(), upload.single("file"), handlerUpdateAvatar);
router.patch("/changepassword/",isAuthenticated(), handlerRutaPutChangePassword);

module.exports = router;
