import { Router } from "express";
import { Note } from "../database/schemas/Notes";
import { deleteNoteById, getNoteById, updateNoteById } from "./notes";

const pinnedRoute = Router();

pinnedRoute.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ isPinned: true });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

pinnedRoute.get("/:id", getNoteById);

pinnedRoute.patch("/:id", updateNoteById);

pinnedRoute.delete("/:id", deleteNoteById);

export default pinnedRoute