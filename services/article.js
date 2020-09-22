"use strict";
const fs = require("fs");
const BaseService = require("./base");
const mdb = require("../models");

class ArticleService extends BaseService {
  constructor(model) {
    super(model);
    this.model = "Article";
  }
  async createArticle(params) {
    const { title, authorId } = params;
    const findRes = await super.findOne({
      title,
      authorId,
    });
    if (findRes) {
      throw "Article already exists";
    }
    const result = await super.create(params);
    return result;
  }
  async update(id, params) {
    const findRes = await super.findById(id);
    if (!findRes) {
      throw "Article not exists";
    }
    await super.update(id, params);
    return { success: true };
  }
  async getArticleList(params) {
    const result = await super.list(params);
    return result;
  }
  async getArticleById(id) {
    const result = await mdb.Article.findById(id).populate([
      { path: "authorId", select: "-password" },
      { path: "categoryId" },
    ]);
    if (!result) {
      throw "Article not exists";
    }
    return result;
  }

  async saveFile(filePath, target, fileName) {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(target);
    readStream.pipe(writeStream);
    return fileName;
  }
}
module.exports = new ArticleService();
