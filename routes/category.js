"use strict";
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post("/", Controllers.category.create);
router.get("/", Controllers.category.list);
router.get("/:_id", Controllers.category.detail);
router.put("/:_id", Controllers.category.update);

module.exports = router;
