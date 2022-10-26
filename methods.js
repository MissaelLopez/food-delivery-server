const jwt = require("jsonwebtoken");

module.exports.ensureToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, process.env.JWT_PRIVATE_TOKEN, (err, res) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).send({ msg: "Unauthorized" });
  }
};
