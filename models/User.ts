import mongoose, { Model } from "mongoose";
import { IUserInterface } from "../types/UserType";
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema<IUserInterface>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (this: any, el: String): boolean {
          return el === this.password;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUserInterface>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password);

  this.confirmPassword = undefined;
});

userSchema.methods.correctPassword = async function (
  requestPassword: String,
  $dbPassword: String
) {
  return bcrypt.compare(requestPassword, $dbPassword);
};

const User: Model<IUserInterface> = mongoose.model("User", userSchema);

module.exports = User;
