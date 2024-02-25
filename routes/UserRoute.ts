import express from "express";
const authController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");

const router = express.Router();

router.get("/all", authController.privateRoute, userController.getAllUsers);
router.get(
  "/logged-in-user",
  authController.privateRoute,
  userController.getLoggedInUser
);

module.exports = router;
