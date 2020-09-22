"use strict";
const BaseService = require("./base");
const mdb = require("../models");

class CategoryService extends BaseService {
  constructor(model) {
    super(model);
    this.model = "ArticleCategory";
  }

  async createCategroy(data) {
    const { userId, name } = data;
    const findRes = await super.findOne({
      userId,
      name,
    });
    if (findRes) {
      throw "Category already exists";
    }
    const result = await super.create(data);
    return result;
  }

  async update(id, params) {
    const findRes = await super.findById(id);
    if (!findRes) {
      throw "Category not exists";
    }
    await super.update(id, params);
    return { success: true };
  }

  async getCategoryById(id) {
    const result = await mdb.ArticleCategory.findById(id).populate([
      { path: "userId", select: "-password" },
    ]);
    if (!result) {
      throw "Category not exists";
    }
    return result;
  }

  async getCategoryList(params) {
    const result = await super.list(params);
    return result;
  }
}
module.exports = new CategoryService();
