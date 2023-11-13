import { NextFunction, Request, Response } from "express";
import authService from "../service/authService";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/apiError";

function getDays(days: number) {
  const hours = 24;
  const minutes = 60;
  const seconds = 60;
  const milliseconds = 1000;

  return days * hours * minutes * seconds * milliseconds;
}

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await authService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: getDays(30),
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthController();
