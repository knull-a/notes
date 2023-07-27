import { Router } from "express";
import { Note } from "../database/schemas/Notes";
import {
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "./notes";

const archiveRoute = Router();

archiveRoute.get("/", async (req, res) => {
  try {
    const { search = "" } = req.query;
    const notes = await Note.find({
      isArchived: true,
      isPinned: false,
    }).populate("labels");
    const filteredNotes = notes
      .reverse()
      .filter(
        (note) =>
          note.title.includes(search as string) ||
          note.text.includes(search as string)
      );
    res.status(200).json(filteredNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

archiveRoute.get("/:id", getNoteById);

archiveRoute.patch("/:id", updateNoteById);

archiveRoute.delete("/:id", deleteNoteById);

export default archiveRoute;
