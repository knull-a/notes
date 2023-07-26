import mongoose from "mongoose";
mongoose
    .connect("mongodb://127.0.0.1:27017/notes")
    .then(() => console.log("Connected to Mongo"))
    .catch((err: Error) => console.error(err));