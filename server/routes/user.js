const { authUser, registerUser } = require("../controllers/users");

const express = require("express");

const router = express.Router();

/**
 * @description   register user and getA token
 * @route          POST /api/users/
 * @access         Public
 *
 * */
router.route("/").post(registerUser);

/**
 * @description   Auth user and get token
 * @route          POST /api/users/login
 * @access         Public
 *
 * */
router.post("/login", authUser);

module.exports = router;
