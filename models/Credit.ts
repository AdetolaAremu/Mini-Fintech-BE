import mongoose, { Model } from "mongoose";
import { ICreditInterface } from "../types/CreditType";
const TransactionFee = require("../models/TransactionFee.ts");

const creditSchema = new mongoose.Schema<ICreditInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Credit has to belong to a user"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    transactionID: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

creditSchema.pre<ICreditInterface>("save", async function (next) {
  await TransactionFee.create({
    user: this.user,
    amount: 50,
    transactionID: this.transactionID,
  });

  next();
});

const Credit: Model<ICreditInterface> = mongoose.model<ICreditInterface>(
  "Credit",
  creditSchema
);

module.exports = Credit;
