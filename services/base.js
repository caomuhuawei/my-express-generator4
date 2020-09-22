"use strict";
const mdb = require("../models");
class BaseService {
  constructor(model) {
    this.model = model;
  }
  async findOne(params) {
    const result = await mdb[this.model].findOne(params).lean();
    return result;
  }
  async findById(id) {
    const result = await mdb[this.model].findById(id).lean();
    return result;
  }
  async create(params) {
    const result = await mdb[this.model].create(params);
    return result;
  }
  async update(_id, params) {
    const result = await mdb[this.model].update({ _id }, { $set: params });
    return result;
  }
  async remove(_id) {
    const result = await mdb[this.model].remove({ _id });
    return result;
  }
  async list(params) {
    const { condition, populate, skipCount, pagesize, sortRule } = params;
    const query = mdb[this.model]
      .find(condition)
      .lean()
      .populate(populate)
      .skip(skipCount)
      .limit(pagesize)
      .sort({ createdAt: Number(sortRule) });
    const totalCount = await mdb[this.model].countDocuments();
    const list = await query;
    return {
      totalCount,
      list,
    };
  }
}

module.exports = BaseService;
