"use strict";
const BaseService = require("./base");
const { crypto } = require("../utils");
class UserService extends BaseService {
  constructor(model) {
    super(model);
    this.model = "User";
  }
  async create(data) {
    const findRes = await super.findOne({ name: data.name });
    if (findRes) {
      throw "User already exists";
    }
    data.password = crypto.encrypted(data.password);
    const createRes = await super.create(data);
    let result = createRes.toObject();
    delete result.password;
    return result;
  }
  async remove(id) {
    const findRes = await super.findById(id);
    if (!findRes) {
      throw "User not exist";
    }
    await super.remove(id);
    return { success: true };
  }
  async update(params) {
    const { _id } = params;
    const findRes = await super.findById(_id);
    if (!findRes) {
      throw "User not exist";
    }
    await super.update(_id, params);
    return { success: true };
  }
  async getList(params) {
    const result = super.list(params);
    return result;
  }
  async detail(id) {//findOne({ name })
    const findRes = await super.findById(id);
    delete findRes.password;
    return findRes;
  }
  async login(params) {
    let findRes = await super.findOne({ name: params.name });
    if (!findRes) {
      throw "User not exist";
    }
    const inputPasswd = crypto.encrypted(params.password);
    if (inputPasswd !== findRes.password) {
      throw "User pwd err";
    }
    delete findRes.password;
    return findRes;
  }
}

module.exports = new UserService();
