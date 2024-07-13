const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const Users = require("../model/Users.model");
// creating a protected route

const protectedRoute = asyncHandler(async (req, res) => {
  // checking if the token is provided in the request headers
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // extracting the token from the request headers
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({
      message: "You are not authorized to perform actions",
      status: 401,
    });
  }
  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decode && decode.userID) {
      // check for the user
      const user = await Users.findById(decode.userID).select("-password");
      if (user) {
        const accessToken = jwt.sign(
          { userID: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.cookie("access", accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 15 * 60 * 1000),
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          path: "/",
        });
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Not authorized", loggedOn: "fail" });
      }
    } else {
      return res.status(401).json({ error: "Access token is invalid" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  protectedRoute,
};
