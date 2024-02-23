import { Document } from "mongoose";

export interface IDebitInterface extends Document {
  user: String;
  amount: Number;
  balanceAfterDebit: Number;
  transactionID: String;
}
