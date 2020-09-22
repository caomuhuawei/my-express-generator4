"use strict";
const jwt = require("jsonwebtoken");
const jwtSecret = "express_jwt";

module.exports = {
  createToken(uuid) {
    const token = jwt.sign({ userId: uuid }, jwtSecret, {
      expiresIn: 3600 * 24,
    });
    return token;
  },
  verifyToken(token) {
    const result = jwt.verify(token, jwtSecret);
    return result;
  },
};
