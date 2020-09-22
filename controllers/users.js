"use strict";
const Services = require("../services");
const { auth } = require("../utils");

class UsersController {
  async create(req, res) {
    try {
      const result = await Services.users.create(req.body);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
  async remove(req, res) {
    try {
      const { _id } = req.params;
      const result = await Services.users.remove(_id);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
  async update(req, res) {
    try {
      const { _id } = req.params;
      const result = await Services.users.update({ ...req.body, _id });
      res.send(result);
    } catch (error) {
      res.send({ error });
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
        populate: [],
      };
      const userList = await Services.users.getList(queryObj);
      userList.list = userList.list.map((data) => {
        delete data.password;
        return data;
      });
      res.send(userList);
    } catch (error) {
      res.send({ error });
    }
  }
  async detail(req, res) {
    try {
      const result = await Services.users.detail(req.params._id);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
  async login(req, res) {
    try {
      const result = await Services.users.login(req.body);
      result.token = auth.createToken(result._id);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
}
module.exports = new UsersController();
