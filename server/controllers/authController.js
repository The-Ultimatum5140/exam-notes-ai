import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/token.js";

//  Google Auth
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({ name, email });
    }

    const token = await generateToken(user._id);

    //  Cookie set
    res.cookie("token", String(token), {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "User authenticated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
