const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  forgotPwd,
  resetPwd,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.post("/forgotPassword", forgotPwd);
router.post("/resetPassword/:str", resetPwd);
router.route("/");
module.exports = router;
