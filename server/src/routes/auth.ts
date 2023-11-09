import { Router } from "express";
import auth from "../controllers/auth";

const authRoute = Router();

const { getAllUsers } = auth;

authRoute.post("/registration");
authRoute.post("/login");
authRoute.post("/logout");

authRoute.get("/activate/:link");
authRoute.get("/refresh");

// test
authRoute.get("/users", getAllUsers);

export default authRoute;
