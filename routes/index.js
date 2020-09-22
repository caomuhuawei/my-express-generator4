"use strict";

const article = require("./article"),
  category = require("./category"),
  user = require("./user");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render('index', { title: 'Express' });
  });
  app.use("/article", article);
  app.use("/category", category);
  app.use("/user", user);
};
