import express from "express";
const creditController = require("../controllers/CreditController");
const authController = require("../controllers/AuthController");

const router = express.Router();

router.get("/", authController.privateRoute, creditController.getAllCredits);

router.post(
  "/",
  authController.privateRoute,
  creditController.createCreditTransaction
);

router.get(
  "/balance",
  authController.privateRoute,
  creditController.getUserBalance
);

router.get("/:id", authController.privateRoute, creditController.getOneCredit);

module.exports = router;
