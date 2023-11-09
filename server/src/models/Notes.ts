import { Schema, SchemaTypes, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: SchemaTypes.String,
      default: "",
      maxlength: 200,
    },
    text: {
      type: SchemaTypes.String,
      required: true,
      maxlength: 10000,
    },
    image: {
      data: {
        type: Buffer,
        default: null,
      },
      contentType: {
        type: String,
        default: null,
      },
    },
    color: {
      type: SchemaTypes.String,
      default: null,
    },
    labels: [
      {
        type: SchemaTypes.ObjectId,
        ref: "label",
      },
    ],
    isPinned: {
      type: SchemaTypes.Boolean,
      required: true,
      default: false,
    },
    isArchived: {
      type: SchemaTypes.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = model("note", NoteSchema);
