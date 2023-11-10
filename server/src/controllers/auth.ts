import { Request, Response } from "express";
import { Auth } from "../models/Auth";
import authService from "../service/authService";

function getDays(days: number) {
  const hours = 24;
  const minutes = 60;
  const seconds = 60;
  const milliseconds = 1000;

  return days * hours * minutes * seconds * milliseconds;
}

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await authService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: getDays(30),
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      res.json(String(error))
      console.error(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async activate(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
    } catch (error) {
      console.error(error);
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
