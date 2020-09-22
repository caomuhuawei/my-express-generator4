"use strict";
const request = require("supertest");
const url = "http://localhost:3000";
const user = {
  name: "test004",
  password: "123456",
};
const category = {
  name: "categroy01",
  userId: "5f688c8c236947354c7805e5",
};

describe("CREATE CATEGORY", function () {
  it("post:", async function () {
    const res = await request(url).post("/user/login").send(user);
    const res2 = await request(url)
      .post("/category")
      .send(category)
      .set("token", res.body.token);
    const { status, body } = res2;
    const { error } = body;
    if (error) {
      console.log(`${status} error: ${error}`);
    } else {
      console.log(`${status} res: ${JSON.stringify(body)}`);
    }
  });
});
describe("GET CATEGORIES", function () {
  it("get:", function (done) {
    request(url)
      .get("/category")
      .end(function (err, res) {
        const { status, body } = res;
        const { error } = body;
        if (error) {
          console.log(`${status} error: ${error}`);
        } else {
          console.log(`${status} res: ${JSON.stringify(body)}`);
        }
        if (err) throw err;
        done();
      });
  });
});
describe("GET CATEGORY", function () {
  it("get:", function (done) {
    request(url)
      .get("/category/5f6978b32127b33750ed9b31")
      .end(function (err, res) {
        const { status, body } = res;
        const { error } = body;
        if (error) {
          console.log(`${status} error: ${error}`);
        } else {
          console.log(`${status} res: ${JSON.stringify(body)}`);
        }
        if (err) throw err;
        done();
      });
  });
});
describe("UPDATE CATEGORY", function () {
  it("update res", function (done) {
    request(url)
      .put("/category/5f6978b32127b33750ed9b31")
      .send({ name: "categoryUpated" })
      .end(function (err, res) {
        const { status, body } = res;
        const { error } = body;
        if (error) {
          console.log(`${status} error: ${error}`);
        } else {
          console.log(`${status} res: ${JSON.stringify(body)}`);
        }
        if (err) throw err;
        done();
      });
  });
});