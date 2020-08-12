const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get JWT Token From Header
  const token = req.header("x-auth-token");

  //Check if not token

  if (!token) {
    return res.status(401).json({ msg: "No Token auth denied" });
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
