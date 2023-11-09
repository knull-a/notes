import { Request, Response } from "express";
import { Label } from "../models/Labels";

type LabelQuery = {
  search?: string;
};

class LabelsController {
  async getAllLabels(req: Request<{}, {}, {}, LabelQuery>, res: Response) {
    try {
      const { search = "" } = req.query;
      const labels = await Label.find({}).populate("notes");
      const filteredLabels = labels
        .reverse()
        .filter((label) => label.title.includes(search as string));
      res.status(200).json(filteredLabels);
    } catch (error) {
      res.status(400).json({ error });
      console.error(error);
    }
  }

  async createLabel(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const newNote = await Label.create({ title });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).json(error);
      console.error(error);
    }
  }

  async editLabel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Label.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ message: "Label updated successfully" });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async deleteLabel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Label.findOneAndRemove({ _id: id });
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new LabelsController();
