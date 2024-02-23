import { Document } from "mongoose";

export interface ITransactionFeeInterface extends Document {
  user: String;
  amount: Number;
  transactionID: String;
}
