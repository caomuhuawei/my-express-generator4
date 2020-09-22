"use strict";
const uuidv1 = require("uuid/dist/v1");
const path = require("path");
const Services = require("../services");
const { auth, upload, validator } = require("../utils");
const { isEmpty } = validator;

class ArticleController {
  async create(req, res) {
    try {
      const { title, content } = req.body;
      if (isEmpty(title)) {
        throw "Title required";
      }
      if (isEmpty(content)) {
        throw "Content required";
      }
      const userInfo = auth.verifyToken(req.headers.token);
      req.body.authorId = userInfo.userId;
      const result = await Services.article.createArticle(req.body);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
  async update(req, res) {
    try {
      const result = await Services.article.update(
        req.params._id,
        req.body
      );
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
  async upload(req, res) {
    try {
      const fileInfo = await upload.getFileInfo(req);
      let result;
      let saveRes = [];
      for (let item in fileInfo.files) {
        const uid = uuidv1();
        const filePath = fileInfo.files[item].path;
        const fileName =
          uid + path.extname(fileInfo.files[item].name).toLowerCase();
        const target = path.join(settings.upload.savePath, fileName);
        saveRes.push(
          await Services.article.saveFile(filePath, target, fileName)
        );
      }
      result = saveRes.map((item) => {
        let obj = {
          imageUrl: `${settings.website}${settings.upload.showPath}${item}`,
          imageName: item,
          resource: "server",
        };
        return obj;
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
  async detail(req, res) {
    try {
      const result = await Services.article.getArticleById(req.params._id);
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
        populate: [
          { path: "authorId", select: "-password" },
          { path: "categoryId" },
        ],
      };
      const result = await Services.article.getArticleList(queryObj);
      res.send(result);
    } catch (error) {
      res.send({ error });
    }
  }
}
module.exports = new ArticleController();
