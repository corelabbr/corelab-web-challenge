import { Request, Response } from "express";
import ColorServices from "../services/ColorServices";

export default class ColorsController {
  static async getAllColors(req: Request, res: Response) {
    try {
      const colors = await ColorServices.getAllColors();

      return res.status(200).json(colors);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
