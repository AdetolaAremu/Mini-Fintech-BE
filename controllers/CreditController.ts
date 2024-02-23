import { successResponseHandler } from "../Utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/catchAsync");
const Credit = require("../models/Credit.ts");
const APIFeatures = require("../Utils/APIFeatures")

export const getAllCredits = catchAsync(async (req: Request) => {
  const Features = new APIFeatures(Credit.find(), req.query)
    .sort()
    .fields()
    .filter()
    .paginate();

  const credit = await Features.query;

  successResponseHandler(
    200,
    "Credit transactions retrieved successfully",
    credit
  );
});

export const getOneCredit = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const credit = await Credit.findById(req.params.id);

    if (!credit) {
      return next(new AppError("Credit transaction not found", 404));
    }

    successResponseHandler(
      200,
      "Credit transaction retrieved successfully",
      credit
    );
  }
);

export const createCreditTransaction = catchAsync(async (req: Request) => {
  const creditTransaction = await Credit.create({
    user: req.body.user,
    amount: req.body.amount,
    transactionID: req.body.transactionID,
  });

  successResponseHandler(
    200,
    "Credit transactions created successfully",
    creditTransaction
  );
});
