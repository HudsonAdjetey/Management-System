const asyncHandler = require("express-async-handler");
const Users = require("../model/Users.model");

// verify new user
const verifyNewUser = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  try {
    // check if the user exist
    const user = await Users.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if there is a user and also a new user
    if (user.newUser) {
      // update user as new user
      await Users.findByIdAndUpdate(userID, { $set: { newUser: false } });
      return res.status(200).json({ message: "User verified as new" });
    }
    //   if there is a user but not a new user, an error response of this account is not new
    return res.status(400).json({ message: "This account is not new" });
  } catch (error) {
    next(error);
  }
});

module.exports = { verifyNewUser };
