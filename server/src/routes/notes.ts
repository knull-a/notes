import { Router } from "express";
import { Note } from "../database/schemas/Notes";

const notesRoute = Router();

notesRoute.get("/", async (req, res) => {
  const notes = await Note.find({ isArchived: false });
  res.send(notes);
});

notesRoute.post("/", async (req, res) => {
  const { title, text, isPinned, isArchived } = req.body;
  await Note.create({ title, text, isPinned, isArchived });
  res.send(201);
});

notesRoute.get("/:id", async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id });
  res.send(note);
});

notesRoute.patch("/:id", async (req, res) => {
  await Note.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.send(200);
});

notesRoute.delete("/:id", async (req, res) => {
  await Note.findOneAndRemove({ _id: req.params.id });
  res.send(200);
});

export default notesRoute;
