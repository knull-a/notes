import { Router } from "express";
import auth from "../controllers/auth";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware";

const authRoute = Router();

const { getAllUsers, registration, login, logout, activate, refresh } = auth;

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     tags: [auth]
 *     summary: Register a new user.
 *     description: Register a new user with their email and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: The user was successfully registered.
 *       400:
 *         description: Some parameters are missing or invalid.
 */
authRoute.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  registration
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [auth]
 *     summary: Login to an account.
 *     description: Login to an account with email and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: yourpassword
 */
authRoute.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [auth]
 *     summary: Logout from an account.
 *     description: Logout from an account.
 */
authRoute.post("/logout", logout);

/**
 * @swagger
 * /auth/activate/{link}:
 *   get:
 *     tags: [auth]
 *     summary: Activate an account.
 *     description: Activate an account.
 *     parameters:
 *       - in: path
 *         name: link
 *         schema:
 *           type: string
 *         required: true
 *         description: The activation link.
 *         example: be493997-0db0-4dca-be5d-def5c8a8f424
 */
authRoute.get("/activate/:link", activate);

/**
 * @swagger
 * /refresh:
 *   get:
 *     tags: [Auth]
 *     summary: Refresh the access token.
 *     description: Refresh the access token using the refresh token stored in cookies.
 *     responses:
 *       200:
 *         description: The access token was successfully refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Refresh token is missing or invalid.
 */
authRoute.get("/refresh", refresh);

// test
authRoute.get("/users", authMiddleware, getAllUsers);

export default authRoute;
