const { Router } = require("express");
const { handleGetAllUsers } = require("./player.controller");

(() => {
  console.log("index.js");
})();

const router = Router();

router.get("/", handleGetAllUsers);


module.exports = router;
