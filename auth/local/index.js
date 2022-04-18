const { Router } = require("express");

const { handlePlayerLogin, hadleVerifyAccount } = require("./local.controller");

const router = Router();

router.post("/login", handlePlayerLogin);
router.get("/verify-account/:token", hadleVerifyAccount);

module.exports = router;
