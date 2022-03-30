const { Router } = require("express");
const { handleGetAllplayer,handleCreatePlayer } = require("./player.controller");



const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);


module.exports = router;
