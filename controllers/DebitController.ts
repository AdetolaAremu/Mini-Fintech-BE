import { generateTransactionId } from "../Utils/Helper";
import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/CatchAsync");
const Debit = require("../models/Debit.ts");
const Credit = require("../models/Credit.ts");
const APIFeatures = require("../Utils/APIFeatures");

export const getAllDebits = catchAsync(async (req: Request, res: Response) => {
  const Features = new APIFeatures(Debit.find(), req.query)
    .sort()
    .fields()
    .filter()
    .paginate();

  const credit = await Features.query;

  res.json({
    message: "Debit transactions retrieved successfully",
    data: {
      credit,
    },
  });
});

export const getOneDebit = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const credit = await Debit.findById(req.params.id);

    if (!credit) {
      return next(new AppError("Debit transaction not found", 404));
    }

    res.json({
      message: "Debit transaction retrieved successfully",
      data: {
        credit,
      },
    });
  }
);

export const createDebitTransaction = catchAsync(
  async (req: Request | any, res: Response) => {
    const debitTransaction = await Debit.create({
      user: req.user._id,
      toUser: req.body.toUser,
      amount: req.body.amount,
      transactionID: generateTransactionId(),
    });

    await Credit.create({
      user: debitTransaction.user,
      toUser: debitTransaction.toUser,
      amount: debitTransaction.amount,
      transactionID: generateTransactionId(),
    });

    res.status(201).json({
      message: "Debit transactions created successfully",
      data: {
        debitTransaction,
      },
    });
  }
);
