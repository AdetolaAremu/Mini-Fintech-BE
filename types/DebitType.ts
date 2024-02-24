import { Document } from "mongoose";

export interface IDebitInterface extends Document {
  user: String;
  toUser: String;
  amount: Number;
  transactionID: String;
}
