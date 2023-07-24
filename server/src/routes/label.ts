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
    const newNote = await Label.create({title})
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json(error);
    console.error(error);
  }
});

export default labelRoute;
