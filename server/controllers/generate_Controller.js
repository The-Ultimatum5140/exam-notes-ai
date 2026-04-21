import NotesModel from "../models/notes_model.js";
import UserModel from "../models/userModel.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    // FIXED destructuring
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required!" });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.credits < 10) {
      return res.status(403).json({
        error: "Insufficient credits",
      });
    }

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    //  FIXED await
    const aiResponse = await generateGeminiResponse(prompt);

    const notes = await NotesModel.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      result: {
        content: aiResponse || {},
      },
      });
    // console.log("Saved Note ID:", notes._id);

    //  Deduct credits AFTER success
    user.credits -= 10;

    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }

    user.notes = user.notes || [];
    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });

  } catch (error) {
    console.error("Generate Notes Error:", error);

    return res.status(500).json({
      error: "AI generation failed",
      message: error.message,
    });
  }
};