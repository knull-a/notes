import { Schema, SchemaTypes, model } from "mongoose";

const AuthSchema = new Schema({
  username: {
    type: SchemaTypes.String,
    unique: true,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
  isActivated: {
    type: SchemaTypes.Boolean,
    default: false,
  },
  activationLink: {
    type: SchemaTypes.String,
  },
});

export const Auth = model("auth", AuthSchema);
