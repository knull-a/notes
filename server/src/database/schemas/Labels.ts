import mongoose, { mongo } from "mongoose";
import { Note } from "./Notes";

const LabelSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    default: null,
    required: true
  },
  notes: {
    type: mongoose.SchemaTypes.Array,
    default: null 
  }
})

export const Label = mongoose.model("label", LabelSchema)