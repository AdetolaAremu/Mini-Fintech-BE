import { NextFunction, Request, Response } from "express";
const catchAsync = require("../Utils/CatchAsync");
const Credit = require("../models/Credit.ts");
const APIFeatures = require("../Utils/APIFeatures");
const Debit = require("../models/Debit.ts");

export const getAllCredits = catchAsync(
  async (req: Request | any, res: Response) => {
    let filter = { user: req.user._id };

    const Features = new APIFeatures(Credit.find(filter), req.query)
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
  }
);

export const getUserBalance = catchAsync(
  async (req: Request | any, res: Response) => {
    const userId = req.user._id;

    const balance = await getTotal(userId);

    res.json({
      message: "Balance retrieved succcessfully",
      data: {
        balance,
      },
    });
  }
);

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

export const getTotal = async (userId: string) => {
  const debitTotal = await Debit.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const creditTotal = await Credit.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return (creditTotal[0]?.total || 0) - (debitTotal[0]?.total || 0);
};
