const asyncHandler = require("express-async-handler");
const { unsubscribe } = require("../routes/userRoutes");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { sendEmail } = require("../mailer/mail");
const { randomStr } = require("../mailer/mailTemplate");
const bcrypt = require("bcryptjs");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({ name, email, password, pic });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
//   /api/user?search=Bharath
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

const forgotPwd = asyncHandler(async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { randomstr: randomStr } },
    (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "Auth failed email not found",
        });
      } else {
        sendEmail(req.body.email, req.body.name, "hello");
        return res.json({
          success: true,
          message: "Password reset link is sent to this email",
        });
      }
    }
  );
});
const resetPwd = asyncHandler(async (req, res) => {
  User.findOne({ randomstr: req.params.str }, (err, user) => {
    ///////////////////////////////////////////////////////////////////////////////////////////
    bcrypt.hash(req.body.password, 7, function (err, hash) {
      // console.log(hash);
      // console.log(hash);
      User.findOneAndUpdate(
        { randomstr: req.params.str },
        { $set: { password: hash, randomstr: "", token: "" } },
        (err, data) => {
          if (data) {
            res.status(200).json({
              success: true,
              message: "Password Updated!",
            });
          }
        }
      );
    });
  });
});
module.exports = { registerUser, authUser, allUsers, forgotPwd, resetPwd };
