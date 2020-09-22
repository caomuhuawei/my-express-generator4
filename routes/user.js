"use strict";
const express = require("express");
const router = express.Router();
const {
  list,
  create,
  detail,
  update,
  remove,
  login,
} = require("../controllers").users;
router.get("/", list);
router.post("/", create);
router.get("/:_id", detail);
router.put("/:_id", update);
router.delete("/:_id", remove);
router.post("/login", login);

module.exports = router;
