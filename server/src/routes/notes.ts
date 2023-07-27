import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Note } from "../database/schemas/Notes";
import { Label } from "../database/schemas/Labels";

const notesRoute = Router();

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ isArchived: false, isPinned: false }).populate('labels');
    const reversedNotes = notes.reverse();
    res.status(200).json(reversedNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNote = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newNote = await Note.create({ ...req.body, session: session });
    const labelsToUpdate = await Label.find({
      _id: { $in: newNote.labels },
    });

    if (labelsToUpdate.length !== newNote.labels.length) {
      throw new Error("Some label IDs are incorrect");
    }

    labelsToUpdate.forEach(async (label) => {
      label.notes.push(newNote._id);
      await label.save({ session: session });
    });

    await session.commitTransaction();

    res.status(201).json({ note: newNote });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error });
  } finally {
    session.endSession();
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id }).populate('labels');
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const noteToUpdate = await Note.findById(id);

    const updatedNote = await Note.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      session,
    });

    if (updatedNote && noteToUpdate) {
      const addedLabels = updatedNote.labels.filter(
        (label) => !noteToUpdate.labels.includes(label)
      );
      
      const removedLabels = noteToUpdate.labels.filter(
        (label) => !updatedNote.labels.includes(label)
      );

      if (addedLabels.length) {
        for (let labelId of addedLabels) {
          const label = await Label.findById(labelId);
          if (label) {
            label.notes.push(updatedNote._id);
            await label.save({ session });
          }
        }
      }

      if (removedLabels.length) {
        for (let labelId of removedLabels) {
          const label = await Label.findById(labelId);
          if (label) {
            label.notes = label.notes.filter(
              (noteId) => noteId.toString() !== updatedNote._id.toString()
            );
            await label.save({ session });
          }
        }
      }
    }
    
    await session.commitTransaction();
    
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error)
    await session.abortTransaction();
    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession();
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
