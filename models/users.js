"use strict";
const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: { type: String, required: "name is required" },
    password: String,
    age: { type: Number, min: 18, max: 95 },
    sex: { type: String, enum: ["male", "female"] },
    role: { type: String, default: "admin" },
    lastLogin: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

UserSchema.set("toJSON", { getters: true, virtuals: true });
UserSchema.set("toObject", { getters: true, virtuals: true });

UserSchema.path("updatedAt").get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

UserSchema.statics = {
  findAge: async function (age) {
    const findRes = await this.find({ age: age });
    return findRes;
  },
};

module.exports = mongoose.model("Users", UserSchema);
