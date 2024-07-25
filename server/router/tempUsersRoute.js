const express = require("express");
const {
  CheckTempUser,
  StoreOtp,
  CreateNewUser,
  Backdoor,
} = require("../controller/UserTempController");
const imageUpload = require("../middleware/ImageUpload");
const organizationLogoUpload = require("../middleware/organizationLogoUpload");
const router = express.Router();

// backdoor route
router.post("/backdoor", Backdoor);
// check temp users and update
router.put("/temp-user/check", CheckTempUser);
// store otp
router.post("/temp-user/store-otp", StoreOtp);
// create new user, delete temporal user
router.post(
  "/delete-temp/user-creater",
  imageUpload,
  organizationLogoUpload,
  CreateNewUser
);

module.exports = router;
