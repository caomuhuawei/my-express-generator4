"use strict";
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post("/",Controllers.article.create);
router.get("/",Controllers.article.list);
router.get("/:_id",Controllers.article.detail);
router.put("/:_id",Controllers.article.update);

module.exports = router;
