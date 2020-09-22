"use strict";
const request = require("supertest");
const url = "http://localhost:3000";
const user = {
  name: "test004",
  password: "123456",
};

describe("POST USER", function () {
  it("post:", function (done) {
    request(url)
      .post("/user")
      .send(user)
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
describe("GET USERS", function () {
  it("get:", function (done) {
    request(url)
      .get("/user")
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
describe("GET USER", function () {
  it("get:", function (done) {
    request(url)
      .get("/user/5f688c8c236947354c7805e5")
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
describe("UPDATE USER", function () {
  it("update:", function (done) {
    request(url)
      .put("/user/5f688c8c236947354c7805e5")
      .send({ sex: "female" })
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
describe("DEL USER", function () {
  it("del:", function (done) {
    request(url)
      .del("/user/5f68808c2e40f32300f427bc")
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
