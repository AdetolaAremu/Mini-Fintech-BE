import { Response } from "express";

const successResponseHandler = (
  status: number,
  message: string,
  data?: string[] | object,
  count?: number,
  res?: Response
) => {
  res?.status(status || 200).json({
    status: true,
    message: message,
    count: count,
    data: data,
  });
};

const errorResponseHandler = (
  status: number,
  message: string,
  error?: number,
  res?: Response
) => {
  res?.status(status || 200).json({
    status: true,
    message: message,
    error: error,
  });
};

export { successResponseHandler, errorResponseHandler };
