import { Router, Request, Response } from "express";
import { Note } from "../database/schemas/Notes";

const notesRoute = Router();

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ isArchived: false });
    const reversedNotes = notes.reverse()
    res.status(200).json(reversedNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNote = async (req: Request, res: Response) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({error})
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Note.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Note.findOneAndRemove({ _id: id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

notesRoute.get("/", getAllNotes);
notesRoute.post("/", createNote);
notesRoute.get("/:id", getNoteById);
notesRoute.patch("/:id", updateNoteById);
notesRoute.delete("/:id", deleteNoteById);

export default notesRoute;
