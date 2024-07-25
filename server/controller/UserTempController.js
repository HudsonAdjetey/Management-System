const asyncHandler = require("express-async-handler");
const TempUsers = require("../model/tempUsers.model");
const Users = require("../model/Users.model");
const fs = require("fs");
const AvatarContainer = require("../utils/AvatarConfig");
const OrganizationModel = require("../model/organization.model");

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

    // Here, you are trying to update the `devID` field with itself.
    // If you intended to update something else, change this part accordingly.
    const updatedTempUser = await TempUsers.findByIdAndUpdate(
      devID,
      { $set: { devID: devID } }, // Update this line if necessary
      { new: true, upsert: true }
    );

    if (!updatedTempUser) {
      return res.status(400).json({
        message: "Failed to update devID",
      });
    }

    return res.status(200).json({
      message: "User check successful",
      user: updatedTempUser, // Return the updated user details if needed
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

/* BACKDOOR */
const Backdoor = asyncHandler(async (req, res, next) => {
  // create a user
  try {
    const { devName, phoneNumber } = req.body;
    const user = await TempUsers.create({
      devName,
      phoneNumber,
    });
    if (user) {
      return res.status(201).json({
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({
        message: "User creation failed",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// MODIFIY AND DELETE TEMPUSERS TO CREATE A NEW USER
const CreateNewUser = asyncHandler(async (req, res, next) => {
  const presetAvatars = AvatarContainer || [];
  const {
    devID,
    username,
    email,
    userRole,
    phoneNumber,
    password,
    ...organizationData
  } = req.body;

  let organization;
  let newUser;

  console.log(userRole, devID);
  try {
    const defaultAvatar =
      presetAvatars[Math.floor(Math.random() * presetAvatars.length)];
    const checkTempUser = await TempUsers.findById(devID);

    if (!checkTempUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Create organization
    organization = await OrganizationModel.create({
      ...organizationData,
      organizationLogo: req.file ? req.file.path : "",
    });

    if (!organization) {
      return res.status(400).json({
        message: "Failed to create organization",
      });
    }

    // Create user linked to the organization
    newUser = await Users.create({
      username,
      email,
      phoneNumber,
      password,
      avatar: req.file ? req.file.path : defaultAvatar,
      organizationBelongTo: organization._id,
      userRole,
    });

    if (!newUser) {
      await OrganizationModel.findByIdAndDelete(organization._id);
      return res.status(400).json({
        message: "Failed to create user",
      });
    }

    // Add user to organization's team array
    organization.organizationTeams = [newUser._id];
    if (userRole === "Admin") {
      organization.organizationAdmin = newUser._id;
    }
    await organization.save();

    // Delete temp user
    await TempUsers.findByIdAndDelete(devID);

    // If everything is successful
    res.status(201).json({
      message: "User and Organization created successfully",
    });
  } catch (error) {
    // Rollback in case of error
    if (organization && !newUser) {
      await OrganizationModel.findByIdAndDelete(organization._id);
    }
    console.error(error);
    next(error);
  } finally {
    // Clean up uploaded file if any error occurred
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = CreateNewUser;

module.exports = CreateNewUser;

const confirmNextStepCreate = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.body;
    // check if the userID matches a user
    const checkUser = await Users.findById(userId);
    if (!checkUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {}
});

module.exports = { CheckTempUser, StoreOtp, CreateNewUser, Backdoor };
