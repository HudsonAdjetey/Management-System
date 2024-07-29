const express = require("express");
const { verifyNewUser } = require("../controller/UsersController");

const router = express.Router();

router.put("verify/update/:userID", verifyNewUser);
module.exports = router;
