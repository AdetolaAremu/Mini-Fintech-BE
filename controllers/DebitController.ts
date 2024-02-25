import { generateTransactionId } from "../Utils/Helper";
import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/CatchAsync");
const Debit = require("../models/Debit.ts");
const Credit = require("../models/Credit.ts");
const APIFeatures = require("../Utils/APIFeatures");

export const getAllDebits = catchAsync(
  async (req: Request | any, res: Response) => {
    let filter = { user: req.user._id };

    const Features = new APIFeatures(Debit.find(filter), req.query)
      .sort()
      .fields()
      .filter()
      .paginate();

    const debit = await Features.query;

    res.json({
      message: "Debit transactions retrieved successfully",
      data: {
        debit,
      },
    });
  }
);

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

    await createDebitFeeTransaction(debitTransaction.user);

    await createCreditTransaction(req);

    res.status(201).json({
      message: "Debit transactions created successfully",
      data: {
        debitTransaction,
      },
    });
  }
);

async function createDebitFeeTransaction(userId: string) {
  return await Debit.create({
    user: userId,
    amount: 10,
    transactionID: generateTransactionId(),
  });
}

async function createCreditTransaction(req: Request | any) {
  return Credit.create({
    user: req.body.toUser,
    amount: req.body.amount,
    transactionID: generateTransactionId(),
  });
}
