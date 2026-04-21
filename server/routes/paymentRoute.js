import express from "express";
import { createOrder, verifyPayment } from "../controllers/credits_controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create-order", isAuth, createOrder);
router.post("/verify", isAuth, verifyPayment);

export default router;