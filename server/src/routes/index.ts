import { Express } from "express";
import notesRoute from "./notes";
import labelRoute from "./label";
import authRoute from "./auth";

export function initRoutes(app: Express) {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/notes", notesRoute);
  app.use("/api/v1/labels", labelRoute);
}
