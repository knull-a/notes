import mongoose, { mongo } from "mongoose";

const LabelSchema = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    default: "",
    required: true
  }
})

export const Label = mongoose.model("label", LabelSchema)