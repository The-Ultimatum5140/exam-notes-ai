import Razorpay from "razorpay";
import crypto from "crypto";
import UserModel from "../models/userModel.js";

// INIT
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  PLAN CONFIG (important)
const PLAN_CREDITS = {
  49: 50,
  99: 150,
  199: 400,
};

//  CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!PLAN_CREDITS[amount]) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    return res.status(200).json(order);

  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
};

//  VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    // SIGNATURE VERIFY
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // USER FIND
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // DUPLICATE CHECK (यहीं डालना है)
    if (user.lastPaymentId === razorpay_payment_id) {
      return res.status(400).json({ error: "Duplicate payment" });
    }

    // CREDITS LOGIC
    const creditsToAdd = PLAN_CREDITS[amount];

    user.credits += creditsToAdd;

    // SAVE PAYMENT ID
    user.lastPaymentId = razorpay_payment_id;

    await user.save();

    return res.json({
      success: true,
      credits: user.credits,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
};