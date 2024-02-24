import express from "express";
const debitController = require("../controllers/DebitController");
const authController = require("../controllers/AuthController");

const router = express.Router();

router.get("/", authController.privateRoute, debitController.getAllDebits);

router.post(
  "/",
  authController.privateRoute,
  debitController.createDebitTransaction
);

router.post("/:id", authController.privateRoute, debitController.getOneDebit);

module.exports = router;
