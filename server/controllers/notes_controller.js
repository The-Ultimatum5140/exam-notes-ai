import mongoose from "mongoose";
import NotesModel from "../models/notes_model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.error("getMyNotes Error:", error);
    return res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const { id } = req.params;

    //  check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid note ID",
      });
    }

    const note = await NotesModel.findOne({
      _id: id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }

    return res.status(200).json({
      _id: note._id,
      topic: note.topic,
      classLevel: note.classLevel,
      examType: note.examType,
      revisionMode: note.revisionMode,
      includeDiagram: note.includeDiagram,
      includeChart: note.includeChart,

      //  main data
      result: note.result,

      createdAt: note.createdAt,
    });
  } catch (error) {
    console.error("getSingleNotes Error:", error);

    return res.status(500).json({
      error: "Failed to fetch note",
    });
  }
};
