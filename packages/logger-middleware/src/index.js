const log4js = require("log4js");
const appRoot = require("app-root-path");
/**
 * Logging module
 * @module @boomerang/boomerang-logging-middleware
 */

/**
 * @param {string} [callingModulePath=""] - path to the module calling
 * @return {object} log4j logger and middleware functions
 */
module.exports = function (callingModulePath = "", ) {
  /**
   * Format filename to remove the path to the app.
   * It will isolate the path to the file from the root of the project if
   * the entire path to file is passed as an argument. Only take last 40 characters and pad if shorter to match log4j format
   */
  const filename = callingModulePath.replace(appRoot, "").slice(-40).padEnd(40, " ");
  const infoFilename = callingModulePath.replace(appRoot, "").slice(-40).padEnd(40, " ");
  log4js.configure({
    appenders: {
      default: {
        type: "console",
        layout: {
          type: "pattern",
          pattern: "[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%z] [%c] %X{filename} : %m%n",
        },
      },
      filtered: {
        type: "noLogFilter",
        exclude: ["health"],
        appender: "default",
      },
    },
    categories: {
      default: { appenders: ["default"], level: "all" },
      http: { appenders: ["default"], level: "all" },
      health: { appenders: ["filtered"], level: "info" },
    },
  });
  const logger = log4js.getLogger("app");
  const httpLogger = log4js.getLogger("http");
  const healthLogger = log4js.getLogger("health");

  /** Add context so the correct filename is returned when calling either logger*/
  logger.addContext("filename", filename);
  httpLogger.addContext("filename", filename);
  healthLogger.addContext("filename", filename);

  const middleware = log4js.connectLogger(httpLogger, {
    level: "auto",
  });
  const healthMiddleware = log4js.connectLogger(warnLogger, {
    level: "debug",
  });
  return { logger, middleware, healthMiddleware };
};
