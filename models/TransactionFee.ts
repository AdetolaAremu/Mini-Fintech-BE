import mongoose, { Model } from "mongoose";
import { ITransactionFeeInterface } from "../types/TransactionFeeType";

const tFeeSchema = new mongoose.Schema<ITransactionFeeInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Transaction fee has to belong to a user"],
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

const tFee: Model<ITransactionFeeInterface> =
  mongoose.model<ITransactionFeeInterface>("tFeeSchema", tFeeSchema);

module.exports = tFee;
