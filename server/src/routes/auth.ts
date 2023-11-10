import { Router } from "express";
import auth from "../controllers/auth";

const authRoute = Router();

const { getAllUsers, registration, login, logout, activate } = auth;

authRoute.post("/registration", registration);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.get("/activate/:link", activate);

authRoute.get("/refresh");

// test
authRoute.get("/users", getAllUsers);

export default authRoute;
