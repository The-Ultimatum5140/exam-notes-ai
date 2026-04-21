import express from "express"

import { generateNotes } from "../controllers/generate_Controller.js"
import isAuth from "../middlewares/isAuth.js"
import { getMyNotes, getSingleNotes } from "../controllers/notes_controller.js"

const notesRouter = express.Router()


notesRouter.post("/generate-notes",isAuth,generateNotes)
notesRouter.get("/getnotes",isAuth,getMyNotes)
notesRouter.get("/:id",isAuth,getSingleNotes)

export default notesRouter