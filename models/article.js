'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const ArticleSchema = new Schema({
  title: String,
  content: String,
  authorId: { type: ObjectId, ref: 'Users', index: true },
  top: { type: Boolean, default: false },
  good: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now, index: true },
  updateAt: { type: Date, default: Date.now },
  countInfo: {
    commentCount: {type: Number, default: 0},
    visitCount: {type: Number, default: 0},
    collectCount: {type: Number, default: 0},
    likeCount: {type: Number, default: 0}
  },
  contentType: { type: String, enum: ['html', 'markdown'] },
  categoryId: { type: ObjectId, ref: 'Categorys' },
  deleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('Articles', ArticleSchema)
