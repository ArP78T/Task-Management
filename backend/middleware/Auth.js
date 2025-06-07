const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.Protected = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    

    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
