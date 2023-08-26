import mongoose from "mongoose";
import { Label } from "./Labels";

const NoteSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    default: "",
    maxlength: 200
  },
  text: {
    type: mongoose.SchemaTypes.String,
    required: true,
    maxlength: 10000
  },
  image: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
  color: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
  labels: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "label"
  }],
  isPinned: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
  isArchived: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
});

export const Note = mongoose.model("note", NoteSchema);
