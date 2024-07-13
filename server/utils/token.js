const jwt = require("jsonwebtoken");

const generateAccessToken = (res, userID) => {
  const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "None",
  });
};

const generateRefreshToken = (res, userID) => {
  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 * 7,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "None",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
