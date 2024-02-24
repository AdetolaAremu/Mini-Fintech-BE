import { successResponseHandler } from "../Utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/CatchAsync");
const Credit = require("../models/Credit.ts");
const APIFeatures = require("../Utils/APIFeatures");

export const getAllCredits = catchAsync(async (req: Request, res: Response) => {
  console.log(req);
  const Features = new APIFeatures(Credit.find(), req.query)
    .sort()
    .fields()
    .filter()
    .paginate();

  const credit = await Features.query;

  res.json({
    message: "Credit transactions retrieved successfully",
    data: {
      credit,
    },
  });
});

export const getOneCredit = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const credit = await Credit.findById(req.params.id);

    if (!credit) {
      return next(new AppError("Credit transaction not found", 404));
    }

    res.json({
      message: "Credit transaction retrieved successfully",
      data: {
        credit,
      },
    });
  }
);

export const createCreditTransaction = catchAsync(
  async (req: Request, res: Response) => {
    const creditTransaction = await Credit.create({
      user: req.body.user,
      amount: req.body.amount,
      transactionID: req.body.transactionID,
    });

    res.json({
      message: "Credit transaction retrieved successfully",
      data: {
        creditTransaction,
      },
    });
  }
);
