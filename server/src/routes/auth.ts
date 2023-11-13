import { Router } from "express";
import auth from "../controllers/auth";
import { body } from "express-validator";

const authRoute = Router();

const { getAllUsers, registration, login, logout, activate } = auth;

authRoute.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  registration
);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.get("/activate/:link", activate);

authRoute.get("/refresh");

// test
authRoute.get("/users", getAllUsers);

export default authRoute;
