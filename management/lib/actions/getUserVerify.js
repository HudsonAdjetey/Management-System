"use server";

const { connectToDB } = require("../dbConfig");

export const verifyUser = async (userID) => {
  try {
    await connectToDB();
    const user = await User.findByIdAndUpdate(
      userID,
      { isVerified: true },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error("Error verifying user: " + error.message);
  }
};
