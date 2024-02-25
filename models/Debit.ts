import mongoose, { Model } from "mongoose";
import { IDebitInterface } from "../types/DebitType";

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

const Debit: Model<IDebitInterface> = mongoose.model<IDebitInterface>(
  "Debit",
  debitSchema
);

module.exports = Debit;
