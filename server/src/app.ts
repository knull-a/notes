import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

import "./database";

import swaggerDocs from "./utils/swagger";
import { initRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

const port = Number(process.env.PORT) || 9080;

app.use(json());
app.use(urlencoded());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "localhost:5173",
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY || "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/notes",
    }),
  })
);

initRoutes(app);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port} !`);
  swaggerDocs(app, port);
});
