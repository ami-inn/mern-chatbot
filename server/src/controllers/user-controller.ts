import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, message: "ok", users });
  } catch (error) {}
};
