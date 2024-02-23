import express from "express";
const debitController = require("../controllers/DebitController");
const authController = require("../controllers/AuthController");

const router = express.Router({ mergeParams: true });

router.get("/", debitController.getAllDebits);

router.post("/", authController.privateRoute, debitController.createCreditTransaction);

router.post(
  "/:id",
  authController.privateRoute,
  debitController.getOneDebit
);

module.exports = router;
