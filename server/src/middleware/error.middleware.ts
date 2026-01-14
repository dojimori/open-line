import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";


export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  console.log(error)
  res.status(500).json({ message: error.message })
}