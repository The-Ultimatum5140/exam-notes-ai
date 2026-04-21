import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      credits: user.credits,
      email: user.email,
    });
  } catch (err) {
    console.log("Controller Error:", err.message);
    return res.status(500).json({
      message: `getCurrentUser Error : ${err.message}`,
    });
  }
};
