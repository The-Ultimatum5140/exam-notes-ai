import express from "express";
import "dotenv/config";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/generate_route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import pdfRouter from "./routes/pdf_route.js";
import paymentRouter from "./routes/paymentRoute.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://exam-notes-ai-eight.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Exam Notes AI Server is running",
  });
});

//  ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/payment", paymentRouter);

// START SERVER
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});
