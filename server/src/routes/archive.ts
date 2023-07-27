import { Router } from "express";
import { Note } from "../database/schemas/Notes";
import { deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "./notes";

const archiveRoute = Router();

archiveRoute.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ isArchived: true, isPinned: false }).populate("labels");
    res.status(200).json(notes);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" });
  }
});

archiveRoute.get("/:id", getNoteById);

archiveRoute.patch("/:id", updateNoteById);

archiveRoute.delete("/:id", deleteNoteById);

export default archiveRoute