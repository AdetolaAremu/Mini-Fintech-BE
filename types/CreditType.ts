import { Document } from "mongoose";

export interface ICreditInterface extends Document {
  user: String;
  amount: Number;
  transactionID: String;
}
