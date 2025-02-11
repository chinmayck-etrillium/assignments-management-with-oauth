const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }
  try {
    const verified = jwt.verify(token, "Secret_Key");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = auth;
