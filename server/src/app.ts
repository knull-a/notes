import express, {json, urlencoded } from "express";
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import session from "express-session"
import dotenv from "dotenv"
import cors from "cors"

import "./database"

import { initRoutes } from "./routes";

dotenv.config()

const app = express();

const port = process.env.PORT || 9080;

app.use(json())
app.use(urlencoded())
app.use(cors())
app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET_KEY || "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/notes"
    })
  })
);

initRoutes(app)

app.listen(port, () => console.log(`App is listening on http://localhost:${port} !`));