import { Router } from "express";
import { Label } from "../database/schemas/Labels";

const labelRoute = Router();

labelRoute.get("/", async (req, res) => {
  try {
    const labels = await Label.find({});
    res.status(200).json(labels);
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
});

labelRoute.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const newNote = await Label.create({ title });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json(error);
    console.error(error);
  }
});

labelRoute.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Label.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "Label updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

labelRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Label.findOneAndRemove({ _id: id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default labelRoute;
