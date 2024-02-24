import express from "express";
const creditController = require("../controllers/CreditController");
const authController = require("../controllers/AuthController");

const router = express.Router();

router.get("/", creditController.getAllCredits);

router.post(
  "/",
  authController.privateRoute,
  creditController.createCreditTransaction
);

router.get("/:id", authController.privateRoute, creditController.getOneCredit);

module.exports = router;
