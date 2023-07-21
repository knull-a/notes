import express, {json, Request, Response, urlencoded } from "express";
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import session from "express-session"
import dotenv from "dotenv"
import "./database"

import notesRoute from "./routes/notes";
import archiveRoute from "./routes/archive"

dotenv.config()

const app = express();

const port = 3001;

app.use(json())
app.use(urlencoded())

app.use(cookieParser())
app.use(
  session({
    secret: process.env.SECRET_KEY || "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/notes"
    })
  })
);

app.use("/api/v1/notes", notesRoute)
app.use("/api/v1/archive", archiveRoute)

app.listen(port, () => console.log(`App is listening on http://localhost:${port} !`));