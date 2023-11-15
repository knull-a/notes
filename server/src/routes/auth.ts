import { Router } from "express";
import auth from "../controllers/auth";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware";

const authRoute = Router();

const { getAllUsers, registration, login, logout, activate, refresh } = auth;

authRoute.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  registration
);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.get("/activate/:link", activate);

authRoute.get("/refresh", refresh);

// test
authRoute.get("/users", authMiddleware, getAllUsers);

export default authRoute;
