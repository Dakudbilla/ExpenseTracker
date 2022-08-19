const User = require("../models/User");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
/**
 * @description   Authenticate user and get token
 * @route          POST /api/users/login
 * @access         Public
 *
 * */
exports.authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const { _id, name } = user;
    res.status(200).json({
      name: name,
      token: generateToken(_id),
    });
  } else {
    res.status(401).json({
      error: "Invalid log In Details",
    });
  }
});

/**
 * @description   register user and getA token
 * @route          POST /api/users/
 * @access         Public
 *
 * */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      error: "User already Exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { _id, name } = user;

    res.status(201).json({
      name,
      token: generateToken(_id),
    });
  } else {
    res.status(400).json({
      error: "Invalid User Data",
    });
  }
});
