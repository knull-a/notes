import { randomUUID } from "crypto";
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
  },
  text: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  image: {
    type: mongoose.SchemaTypes.String,
  },
  isPinned: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false
  },
  isArchived: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date()
  }
})

export const Note = mongoose.model("note", NoteSchema)