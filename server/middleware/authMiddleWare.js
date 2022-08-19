const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  console.log(req.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.error(err);

      return res.status(401).json({
        success: false,
        error: "Not Authorized Request",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: `Server Error `,
    });
  }
});

// export const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized as an Admin");
//   }
// };
