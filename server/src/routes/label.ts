import { Router } from "express";
import labels from "../controllers/labels";

const labelRoute = Router();

const { getAllLabels, createLabel, editLabel, deleteLabel } = labels;

labelRoute.get("/", getAllLabels);

labelRoute.post("/", createLabel);

labelRoute.patch("/:id", editLabel);

labelRoute.delete("/:id", deleteLabel);

export default labelRoute;
