import { Schema, SchemaTypes, model } from "mongoose";

const TokenSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
  refreshToken: {
    type: SchemaTypes.String,
    required: true,
  },
});

export const Token = model('token', TokenSchema)
