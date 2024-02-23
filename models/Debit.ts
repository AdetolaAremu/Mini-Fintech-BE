import mongoose, { Model } from "mongoose";
import { IDebitInterface } from "../types/DebitType";
const TransactionFee = require("../models/TransactionFee.ts");

const debitSchema = new mongoose.Schema<IDebitInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Debit has to belong to a user"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    balanceAfterDebit: {
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

debitSchema.pre<IDebitInterface>("save", async function (next) {
  await TransactionFee.create({
    user: this.user,
    amount: 50,
    transactionID: this.transactionID,
  });

  next();
});

const Debit: Model<IDebitInterface> = mongoose.model<IDebitInterface>(
  "Debit",
  debitSchema
);

module.exports = Debit;
