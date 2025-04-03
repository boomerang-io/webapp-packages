"use strict";
/*eslint-env node*/

const path = require("path");
const fs = require("fs");
const cors = require("cors");
const serialize = require("serialize-javascript");
const boomerangLogger = require("@boomerang-io/logger-middleware")("webapp-spa-server/index.js");
const health = require("@cloudnative/health-connect");
const defaultHtmlHeadInjectDataKeys = require("./config").defaultHtmlHeadInjectDataKeys;

// Get logger function
const logger = boomerangLogger.logger;

/**
 * Begin exported module
 */

function createBoomerangServer({
  corsConfig,
  disableInjectHTMLHeadData,
}) {
  /**
   * Read in values from process.env object
   * Set defaults for the platform for unprovided values
   */
  const {
    APP_ROOT = "/",
    PORT = 3000,
    HTML_HEAD_INJECTED_DATA_KEYS = defaultHtmlHeadInjectDataKeys.join(),
    NEW_RELIC_APP_NAME,
    NEW_RELIC_LICENSE_KEY,
    HTML_HEAD_INJECTED_SCRIPTS,
    BUILD_DIR = "build",
    CORS_CONFIG,
  } = process.env;

  const appCorsConfig = corsConfig || parseJSONString(CORS_CONFIG);

  // Monitoring
  if (NEW_RELIC_APP_NAME && NEW_RELIC_LICENSE_KEY) {
    require("newrelic");
  }

  /**
   * Start Express app
   */
  const express = require("express");
  const app = express();

  // Compression
  const compression = require("compression");
  app.use(compression());

  // Logging
  app.use(boomerangLogger.middleware);

  // Security
  const helmet = require("helmet");
  app.use(
    helmet({
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.disable("x-powered-by");
  appCorsConfig && app.use(cors(appCorsConfig));

  // Parsing
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));

  // Initialize healthchecker and add routes
  const healthchecker = new health.HealthChecker();
  app.use("/health", health.LivenessEndpoint(healthchecker).then(middleware => {
    logger.info("Testing");
    logger.info(middleware);
  }));
  app.use("/ready", health.ReadinessEndpoint(healthchecker));

  // Create endpoint for the app serve static assets
  const appRouter = express.Router();

  /**
   * Next two routes are needed for serving apps with client-side routing
   * Do NOT return index.html file by default if `disableInjectHTMLHeadData = true`. We need append data to it.
   * It will be returned on the second route
   * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing
   * Cache assets "forever" aka max recommended value of one year
   */
  if (!disableInjectHTMLHeadData) {
    appRouter.use(
      "/",
      express.static(path.join(process.cwd(), BUILD_DIR), {
        maxAge: 31536000000,
        index: false,
      })
    );
    appRouter.get("/*", (_, res) =>
      injectEnvDataAndScriptsIntoHTML({
        res,
        appRoot: APP_ROOT,
        buildDir: BUILD_DIR,
        injectedDataKeys: HTML_HEAD_INJECTED_DATA_KEYS,
        injectedScripts: HTML_HEAD_INJECTED_SCRIPTS,
      })
    );
  } else {
    appRouter.use("/", express.static(path.join(process.cwd(), BUILD_DIR)));
  }

  // Make sure that files with .css has a type="text/css" since they were throwing errors related to MIME check
  app.use(express.static(APP_ROOT, {
    setHeaders: function (res, path) {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    }
  }));

  app.use(APP_ROOT, appRouter);

  // Start server on the specified port and binding host
  app.listen(PORT, "0.0.0.0", function () {
    logger.debug("server starting on", PORT);
    logger.debug(`serving on root context: ${APP_ROOT}`);
    logger.info(`View app: http://localhost:${PORT}${APP_ROOT}`);
  });

  // Return server if needed to be used in an app
  return app;
}

/**
 * Start utility functions
 */

/**
 * Add JSON data and scripts to the html file based on environment. Enables same docker image to be used in any environment
 * https://medium.com/@housecor/12-rules-for-professional-javascript-in-2015-f158e7d3f0fc
 * https://stackoverflow.com/questions/33027089/res-sendfile-in-node-express-with-passing-data-along
 * @param {function} res - Express response function
 * @param {string} buildDir - build directory for building up path to index.html file
 * @param {string} injectedDataKeys - string of comma delimited values
 * @param {string} injectedScripts - string of comma delimited values
 */
function injectEnvDataAndScriptsIntoHTML({ res, buildDir, appRoot, injectedDataKeys, injectedScripts }) {
  // Build up object of external data to append
  const headInjectedData = injectedDataKeys.split(",").reduce((acc, key) => {
    acc[key] = process.env[key];
    return acc;
  }, {});

  // Build up string of scripts to append, absolute path
  const localScriptTags = injectedScripts
    ? injectedScripts
        .split(",")
        .reduce((acc, currentValue) => `${acc}<script async src="${appRoot}/${currentValue}"></script>`, "")
    : "";
  // Set the response type so browser interprets it as an html file
  res.type(".html");

  // Read in HTML file and add callback functions for EventEmitter events produced by ReadStream
  fs.createReadStream(path.join(process.cwd(), buildDir, "index.html"))
    .on("end", () => {
      res.end();
    })
    .on("error", (e) => logger.error(e))
    .on("data", (chunk) => res.write(addHeadData(chunk)));

  /**
   * Convert buffer to string and replace closing head tag with env-specific data and additional scripts
   * Serialize data for security
   * https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0
   * @param {Buffer} chunk
   * @return {string} replaced string with data interopolated
   */
  function addHeadData(chunk) {
    return chunk.toString().replace(
      "</head>",
      `<script>
        window._SERVER_DATA = ${serialize(headInjectedData, {
          isJSON: true,
        })};
      </script>
      ${getBeeheardSurveyScripts()}
      ${getGAScripts()}
      ${getBluemixSegmentScripts()}
      ${getInstanaScripts()}
      ${localScriptTags}
      </head>`
    );
  }
}

// Include BeeHeard survey based on env var
function getBeeheardSurveyScripts() {
  const enableBeeheardSurvey = process.env.ENABLE_BEEHEARD_SURVEY;
  return Boolean(enableBeeheardSurvey)
    ? '<script async src="https://beeheard.dal1a.cirrus.ibm.com/survey/preconfig/HHPxpQgN.js" crossorigin></script>'
    : "";
}

// Include Google Analytics based on env var
function getBluemixSegmentScripts() {
  const enableSegment = process.env.SEGMENT_ENABLED;
  const segmentUrl = process.env.SEGMENT_SCRIPT_URL;
  const segmentKey = process.env.SEGMENT_KEY;

  return Boolean(enableSegment)
    ? `<script>
        digitalData = {
          page: {
            pageInfo: {
              pageID: "ibm_consulting_advantage_test",
              productCode: "694970X",
              productCodeType: "Consulting Assistants",
              productTitle: "IBM Consulting Advantage",
              analytics: {
                category: "Offering Interface"
              }
            }
          }
        };
      </script>
      <script type="text/javascript"> window._analytics = { "segment_key" : "${segmentKey}", "coremetrics" : false, "optimizely" : false, "googleAddServices": false, "fullStory" : false}; </script>
      <script src="${segmentUrl}" crossorigin></script>
      <script>
        window._analytics = {
          "pageProperties": {
            "platformTitle": "IBM Consulting Advantage",
            "productCode": "694970X",
            "productCodeType": "IBM Consulting Advantage",
          },
          "commonProperties": {
            "platformTitle": "IBM Consulting Advantage",
            "productCode": "694970X",
            "productCodeType": "IBM Consulting Advantage",
          }
        };
      </script>
      `
    : "";
}

// Include Google Analytics based on env var
function getGAScripts() {
  const gaSiteId = process.env.GA_SITE_ID;
  const gaUrl = process.env.GA_SCRIPT_URL;
  const gaEnabled = process.env.GA_ENABLED;

  return Boolean(gaEnabled)
    ? `<script type="text/javascript">
        window.idaPageIsSPA = true;
        window._ibmAnalytics = {
          settings: {
            name: "IBM_Services_Essentials",
            isSpa: true,
            tealiumProfileName: "ibm-web-app",
          },
          trustarc: {
            isCookiePreferencesButtonAlwaysOn: false,
          },
        };
        digitalData = {
          page: {
            pageInfo: {
              ibm: {
                siteID: '${gaSiteId}',
              }
            },
            category: {
              primaryCategory: 'PC100'
            }
          }
        };
      </script>
      <script async src="${gaUrl}" type="text/javascript" crossorigin></script>`
    : "";
}

// Include Instana monitoring based on env var
function getInstanaScripts() {
  const instanaReportingUrl = process.env.INSTANA_REPORTING_URL;
  const instanaKey = process.env.INSTANA_KEY;

  return Boolean(instanaReportingUrl) && Boolean(instanaKey)
    ? `<script type="text/javascript">
      (function(s,t,a,n){s[t]||(s[t]=a,n=s[a]=function(){n.q.push(arguments)},
      n.q=[],n.v=2,n.l=1*new Date)})(window,"InstanaEumObject","ineum");
      ineum('reportingUrl', '${instanaReportingUrl}');
      ineum('key', '${instanaKey}');
      ineum('trackSessions');
      </script>
      <script async crossorigin="anonymous" src="https://eum.instana.io/eum.min.js"></script>`
    : "";
}

//Check if a CORS_CONFIG from env is a valid JSON object and return it if so
function parseJSONString(jsonString) {
  try {
    const parseJSON = Boolean(jsonString) && JSON.parse(jsonString);
    return typeof parseJSON === "object" ? parseJSON : false;
  } catch (e) {
    console.log(`JSON Parse error: ${e}`);
    return false;
  }
};

module.exports = createBoomerangServer;
