import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const authorize = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) return res.status(401).json({ message: "Unauthorized" });

      // decode token values
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user
      const user = await User.findById(decoded.userId);

      // if user not exist
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      req.user = user;

      next();
    } else {
      res.status(401).json({
        message: "provide authorization header with token",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export default authorize;
