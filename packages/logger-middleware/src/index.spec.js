const express = require("express");
const request = require("supertest");
const boomerangLogger = require("./index")(__filename);
const { logger } = boomerangLogger;

describe("Default logging levels and colors", () => {
  it("Should log [TRACE] on logger.trace\n", (done) => {
    logger.trace("trace test");
    done();
  });

  it("Should log [DEBUG] on logger.debug\n", (done) => {
    logger.debug("debug test");
    done();
  });

  it("Should log [INFO] on logger.info\n", (done) => {
    logger.info("info test");
    done();
  });

  it("Should log [WARN] on logger.warn\n", (done) => {
    logger.warn("warn test");
    done();
  });

  it("Should log [ERROR] on logger.error\n", (done) => {
    logger.error("error test");
    done();
  });

  it("Should log [FATAL] on logger.fatal\n", (done) => {
    logger.fatal("fatal test");
    done();
  });
});

describe("Default Connect/Express logging", () => {
  // Create express app to test middleware
  let app = express();
  app.use(boomerangLogger.middleware);

  app.get("/", (req, res) => {
    return res.send(req.user);
  });

  app.get("/301", (req, res) => {
    return res.status(301).send(req.user);
  });
  app.get("/400", (req, res) => {
    return res.status(400).send(req.user);
  });

  it("Should log [INFO] on 200 response\n", (done) => {
    request(app)
      .get("/")
      .end(() => done());
  });

  it("Should log [WARN] on 300 response\n", (done) => {
    request(app)
      .get("/301")
      .end(() => done());
  });
  it("Should log [ERROR] on 400 response\n", (done) => {
    request(app)
      .get("/400")
      .end(() => done());
  });
});
