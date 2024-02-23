import { successResponseHandler } from "../Utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/catchAsync");
const Debit = require("../models/Debit.ts");
const APIFeatures = require("../Utils/APIFeatures")


export const getAllDebits = catchAsync(async (req: Request) => {
  const Features = new APIFeatures(Debit.find(), req.query)
    .sort()
    .fields()
    .filter()
    .paginate();

  const credit = await Features.query;

  successResponseHandler(
    200,
    "Debit transactions retrieved successfully",
    credit
  );
});

export const getOneDebit = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const credit = await Debit.findById(req.params.id);

    if (!credit) {
      return next(new AppError("Debit transaction not found", 404));
    }

    successResponseHandler(
      200,
      "Debit transaction retrieved successfully",
      credit
    );
  }
);

export const createCreditTransaction = catchAsync(async (req: Request) => {
  const debitTransaction = await Debit.create({
    user: req.body.user,
    amount: req.body.amount,
    transactionID: req.body.transactionID,
  });

  successResponseHandler(
    200,
    "Debit transactions created successfully",
    debitTransaction
  );
});
