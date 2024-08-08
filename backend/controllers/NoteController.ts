import { Request, Response } from "express";
import Note from "../models/Note";
import titleValidation from "../helpers/validations/titleValidation";
import contentValidation from "../helpers/validations/contentValidation";
import isBoolean from "../helpers/validations/booleanValidation";

class NoteController {
  static async getData(req: Request, res: Response)
  {
    try
    {
      const data = await Note.find();

      const favoriteNotes = await data.filter((note: any) => note.favorite);
      const otherNotes = await data.filter((note: any) => !note.favorite);

      res.status(200).json({
        favoriteNotes,
        otherNotes
      });
    } 
    catch(error)
    {
      res.status(500).json({ message: 'Erro com o banco de dados.', error });
    }
  }

  static async getSearch(req: Request, res: Response)
  {
    const title = req.query.search;
    let data;

    if (!title) {
      data = await Note.find();
    } else {
      data = await Note.find({ 
        title: { $regex: title, $options: 'i' }
      });
    }

    const favoriteNotes = await data.filter((note: any) => note.favorite);
    const otherNotes = await data.filter((note: any) => !note.favorite);

    res.status(200).json({
      favoriteNotes,
      otherNotes
    });
  }

  static async createNote(req: Request, res: Response)
  {
    let {title, favorite, content } = req.body;
    title = title.trim();
    title = title.charAt(0).toUpperCase() + title.slice(1);

    content = content.trim();

    const validData = await Note.find({title: title});

    if(validData.length > 0) {
      return res.status(409).json({
        message: "O título já existe.",
        type: "error",
      });
    }

    const validTitle = await titleValidation(title);
    if (validTitle !== "Valid title.") 
    {
      return res.status(422).json({
        message: validTitle,
        type: "error",
      });
    }

    if(!isBoolean(favorite)) {
      return res.status(422).json({
        message: "Tipo favorito não é o correto.",
        type: "error",
      });
    }

    const validContent = await contentValidation(content);
    if (validContent !== "Valid content.") 
    {
      return res.status(422).json({
        message: validContent,
        type: "error",
      });
    }

    try
    {
      await Note.create({
        title: title,
        favorite: favorite,
        color: "#FFFFFF",
        content: content
      })

      res.status(201).json({
        message: "Anotação criada.",
        type: "success",
      });
    }
    catch(error: any)
    {
      res.status(500).json({
        message: error.message,
        type: "error",
      });
    }
  }

  static async updateNote(req: Request, res: Response)
  {
    let { _id, title, oldTitle, favorite, oldFavorite, content, oldContent } = req.body;
    title = title.trim();
    title = title.charAt(0).toUpperCase() + title.slice(1);

    content = content.trim();

    if (title === oldTitle && favorite === oldFavorite && content === oldContent){
      return res.status(409).json({
        message: "Por favor, atualize uma informação antes.",
        type: "error",
      });
    }

    const validTitle = await titleValidation(title);
    if (validTitle !== "Valid title.") 
    {
      return res.status(422).json({
        message: validTitle,
        type: "error",
      });
    }

    if(title !== oldTitle) {
      const validData = await Note.find({title: title});
      if(validData.length > 0) {
        return res.status(409).json({
          message: "O título já existe.",
          type: "error",
        });
      }
    }

    const validContent = await contentValidation(content);
    if (validContent !== "Valid content.") 
    {
      return res.status(422).json({
        message: validContent,
        type: "error",
      });
    }

    const data = {
      _id,
      title,
      favorite,
      content
    }
    
    try
    {
      await Note.findByIdAndUpdate(_id, data);
      res.status(200).json({
        message: "Anotação atualizada com sucesso!",
        type: "success",
      });
    }
    catch(error: any)
    {
      res.status(500).json({
        message: error.message,
        type: "error",
      });
    }
  }

  static async updateColor(req: Request, res: Response)
  {
    let { _id, color } = req.body;

    try
    {
      await Note.findByIdAndUpdate(_id, { color: color });
      res.status(200).json({
        message: "Cor da anotação atualizada!",
        type: "success",
      });
    }
    catch(error: any)
    {
      res.status(500).json({
        message: error.message,
        type: "error",
      });
    }
  }

  static async deleteNote(req: Request, res: Response)
  {
    const _id = req.params.id;

    try
    {
      await Note.deleteOne({ _id: _id });
      res.status(200).json({
        message: "Anotação deletada com sucesso!",
        type: "success",
      });
    }
    catch(error: any)
    {
      res.status(500).json({
        message: error.message,
        type: "error",
      });
    }
  }
}

export default NoteController;