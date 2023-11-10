import { Router } from "express";
import multer from "multer";
import notes from "../controllers/notes";

const notesRoute = Router();
const upload = multer({ dest: "uploads/" });

const { getAllNotes, createNote, getNoteById, updateNoteById, deleteNoteById } =
  notes;

notesRoute.get("/", getAllNotes);

notesRoute.post("/", upload.single("image"), createNote);

notesRoute.get("/:id", getNoteById);

notesRoute.patch("/:id", upload.single("image"), updateNoteById);

notesRoute.delete("/:id", deleteNoteById);

export default notesRoute;
