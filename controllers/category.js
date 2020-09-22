"use strict";
const Services = require("../services");
const { auth, validator } = require("../utils");
const { isEmpty } = validator;

class CategoryController {
  async create(req, res) {
    try {
      if (isEmpty(req.body.name)) {
        throw "Name required";
      }
      const userInfo = auth.verifyToken(req.headers.token);
      req.body.userId = userInfo.userId;
      const result = await Services.category.createCategroy(req.body);
      res.send(result);
    } catch (error) {
      res.send({error});
    }
  }

  async update(req, res) {
    try {
      const result = await Services.category.update(req.params._id, req.body);
      res.send(result);
    } catch (error) {
      res.send({error});
    }
  }

  async detail(req, res) {
    try {
      const result = await Services.category.getCategoryById(req.params._id);
      res.send(result);
    } catch (error) {
      res.send({error});
    }
  }

  async list(req, res) {
    try {
      const { pagesize = 10, page = 1, sortRule = -1 } = req.query;
      const queryObj = {
        condition: req.query,
        skipCount: (page - 1) * pagesize,
        pagesize,
        sortRule,
        populate: [{ path: "userId", select: "-password" }],
      };
      const result = await Services.category.getCategoryList(queryObj);
      res.send(result);
    } catch (error) {
      res.send({error});
    }
  }
}
module.exports = new CategoryController();
