import mongoose, { Model } from "mongoose";
import { IDebitInterface } from "../types/DebitType";
import { generateTransactionId } from "../Utils/Helper";
const Credit = require("../models/Credit.ts");

const debitSchema = new mongoose.Schema<IDebitInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Debit has to belong to a user"],
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Receiving user is required"],
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

debitSchema.post<IDebitInterface>("save", async function (next) {
  // Debit.create({
  //   user: this.user,
  //   amount: 10,
  //   transactionID: this.transactionID,
  // });

  // now we are crediting someone
  // Credit.create({
  //   user: this.user,
  //   toUser: this.toUser,
  //   amount: this.amount,
  //   transactionID: generateTransactionId(),
  // });

  // next();
});

const Debit: Model<IDebitInterface> = mongoose.model<IDebitInterface>(
  "Debit",
  debitSchema
);

module.exports = Debit;
