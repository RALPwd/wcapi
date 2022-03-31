const { Router } = require("express");
const { handleGetAllplayer,handleCreatePlayer,handleGetLoginEmail} = require("./player.controller");



const router = Router();

router.get("/", handleGetAllplayer);
router.post("/", handleCreatePlayer);
router.get("/email/", handleGetLoginEmail);


module.exports = router;
