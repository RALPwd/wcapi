const { Router } = require("express");
const {
  handlecreateDonation,
  handlegetDonations,
} = require("./donations.controller");
  

const { isAuthenticated } = require("../../auth/auth.services");

const router = Router();

router.post("/", isAuthenticated(), handlecreateDonation);
router.get("/", isAuthenticated(), handlegetDonations);

module.exports = router;
