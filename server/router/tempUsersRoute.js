const express = require("express");
const {
  CheckTempUser,
  StoreOtp,
  CreateNewUser,
} = require("../controller/UserTempController");

const router = express.Router();

// check temp users and update
router.put("/temp-user/check", CheckTempUser);
// store otp
router.post("/temp-user/store-otp", StoreOtp);
// create new user, delete temporal user
router.post("/delete-temp/user-creater", CreateNewUser);

module.exports = router;
