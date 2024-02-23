import { successResponseHandler } from "../Utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const jwtSignedToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

export const registerUser = catchAsync(async (req: Request) => {
  const registeredUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  successResponseHandler(201, "Registration successfull", registeredUser);
});

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return next(
        new AppError("Email and/or Password fields can not be empty", 422)
      );
    }

    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(
          new AppError(
            "User does not exist, please reconfirm your credentials",
            404
          )
        );
      }

      if (!(await user.correctPassword(password, user.password))) {
        return next(new AppError("Email and Password do not match", 400));
      }

      const token = jwtSignedToken(user.id);

      const jwtExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN
        ? Number(process.env.JWT_COOKIE_EXPIRES_IN)
        : 1;

      const cookieOptions = {
        expires: new Date(Date.now() + jwtExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secured: true,
      };

      res.cookie("jwt", token, cookieOptions);

      if (process.env.NODE_ENV === "production") cookieOptions.secured = true;

      res.status(200).json({
        message: "Login successful",
        token,
      });
    }
  }
);

interface CustomRequest extends Request {
  user?: any;
}

export const privateRoute = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not authorized", 403));
    }

    const decodedToken = await promisify(jwt.verify)(
      token,
      process?.env?.JWT_SECRET
    );

    const currentUser = await User.findById(decodedToken.id);

    if (!currentUser) {
      return next(new AppError("Token does not belong to any user", 403));
    }

    req.user = currentUser;
    next();
  }
);
