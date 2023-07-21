import { Router } from "express";
import { Note } from "../database/schemas/Notes";

const archiveRoute = Router();

archiveRoute.get("/", async (req, res) => {
  const archive = await Note.find({isArchived: true})
  res.send(archive)
})

export default archiveRoute