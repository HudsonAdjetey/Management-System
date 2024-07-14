const asyncHandler = require("express-async-handler");
const TempUsers = require("../model/tempUsers.model");
const Users = require("../model/Users.model");
const fs = require("fs");
const AvatarContainer = require("../utils/AvatarConfig");
const CheckTempUser = asyncHandler(async (req, res, next) => {
  const { devID, phoneNumber, devName } = req.body;

  try {
    // Check if the temporary user exists in the database
    const checkTempUser = await TempUsers.findOne({
      _id: devID,
      phoneNumber,
      devName,
    });

    if (!checkTempUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const createdDEVID = await TempUsers.findByIdAndUpdate(
      devID,
      { devID },
      { new: true, upsert: true }
    );

    if (!createdDEVID) {
      return res.status(400).json({
        message: "Failed to update devID",
      });
    }

    return res.status(200).json({
      message: "User check successful",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Middleware to store the OTP
const StoreOtp = asyncHandler(async (req, res, next) => {
  const { otp, devID } = req.body;

  try {
    const user = await TempUsers.findById(devID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.otp = otp;
    await user.save();

    return res.status(201).json({
      message: "OTP stored successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// MODIFIY AND DELETE TEMPUSERS TO CREATE A NEW USER
const CreateNewUser = asyncHandler(async (req, res, next) => {
  const presetAvatars = AvatarContainer || [];
  const { devID, username, email, phoneNumber, password, otp } = req.body;
  try {
    const defaultAvatar =
      presetAvatars[Math.floor(Math.random() * presetAvatars.length)];
    const checkTempUser = await TempUsers.findById(devID);
    if (!checkTempUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (checkTempUser.otp !== otp) {
      return res.status(401).json({
        message: "Invalid OTP, not authorized",
      });
    }
    const newUser = await Users.create({
      devID,
      username,
      email,
      phoneNumber,
      password,
      // avatar
      avatar: req.file ? req.file.path : defaultAvatar,
    });
    await TempUsers.findByIdAndDelete(devID);
    // delete the the upload file path
    if (newUser) {
      fs.unlinkSync(req.file.path);
    }
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = { CheckTempUser, StoreOtp, CreateNewUser };
