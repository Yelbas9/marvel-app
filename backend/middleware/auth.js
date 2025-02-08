const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, token manquant" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
