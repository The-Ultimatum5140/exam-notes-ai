import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    // 🔹 User reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Input fields
    topic: {
      type: String,
      required: true,
      trim: true,
    },

    classLevel: {
      type: String,
      default: "Not Specified",
    },

    examType: {
      type: String,
      default: "General",
    },

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: {
      type: Boolean,
      default: false,
    },

    includeChart: {
      type: Boolean,
      default: false,
    },

    result: {
      subTopics: {
        "⭐": [String],
        "⭐⭐": [String],
        "⭐⭐⭐": [String],
      },

      importance: {
        type: String,
        enum: ["⭐", "⭐⭐", "⭐⭐⭐"],
      },

      content: {
        type: mongoose.Schema.Types.Mixed,
      },

      revisionPoints: [String],

      diagram: {
        type: String,
        default: "",
      },

      chart: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },
    },

    // 🔹 Metadata
    provider: {
      type: String,
      enum: ["openai", "gemini"],
      default: "gemini",
    },

    tokensUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


notesSchema.index({ user: 1, createdAt: -1 });

const NotesModel = mongoose.model("Notes", notesSchema);

export default NotesModel;