import mongoose from "mongoose";
mongoose
    .connect("mongodb://localhost:27017/notes")
    .then(() => console.log("Connected to Mongo"))
    .catch((err: Error) => console.error(err));