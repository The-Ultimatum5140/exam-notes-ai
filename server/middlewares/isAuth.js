import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // console.log("Cookies received:", req.cookies);  no need
    console.log("Cookies Received")

    const token = req.cookies.token;

    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;