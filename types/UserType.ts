import { Document } from "mongoose";

export interface IUserInterface extends Document {
  password: String;
  confirmPassword?: String;
  firstName: String;
  lastName: String;
  middleName: String;
  email: String;
  username: String;
}
