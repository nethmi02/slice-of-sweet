const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const decoded = jwt.verify(token, "hehe");
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired");
    }
    res.status(400).send("Invalid token");
  }
};

module.exports = authenticate;
