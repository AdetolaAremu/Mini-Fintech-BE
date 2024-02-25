import { Request, Response } from "express";
const catchAsync = require("../Utils/CatchAsync");
const User = require("../models/User.ts");
const APIFeatures = require("../Utils/APIFeatures");

export const getAllUsers = catchAsync(
  async (req: Request | any, res: Response) => {
    let filter = { _id: { $ne: req.user._id } };

    const Features = new APIFeatures(User.find(filter), req.query)
      .sort()
      .fields()
      .filter()
      .paginate();

    const user = await Features.query;

    res.json({
      message: "Users retrieved successfully",
      data: {
        user,
      },
    });
  }
);

export const getLoggedInUser = catchAsync(
  async (req: Request | any, res: Response) => {
    const user = req.user;

    res.json({
      message: "User retrieved successfully",
      data: {
        user,
      },
    });
  }
);
