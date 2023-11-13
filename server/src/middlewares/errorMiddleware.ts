import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError";

export function errorMiddleware (err: Error, _: Request, res: Response, __: NextFunction) {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err.message || "Server error" });
};
