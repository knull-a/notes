import { Schema, SchemaTypes, model } from "mongoose";

const LabelSchema = new Schema(
  {
    title: {
      type: SchemaTypes.String,
      default: null,
      required: true,
    },
    notes: [
      {
        type: SchemaTypes.ObjectId,
        ref: "note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Label = model("label", LabelSchema);
