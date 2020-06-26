# Boomerang Node.js Logging Lib

A logger and a Connect/Express middleware for creating logging events in a standard format on the Boomerang platform. It is based on our Java Log4j configuration.

## What it does

This package contains a factory function that returns an object with two functions that create a logging event.

- logger function
- Connect/Express middleware

Produced logs are logged to the console and collected by ICP.

## Logging Format

The Pattern used by both the logger and the middleware is

```
[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%z] [%c] %X{filename} : %m%n"
```

- See the "Pattern" section of [Log4js layout docs](https://log4js-node.github.io/log4js-node/layouts.html) for an explanation of it
- `filename` token can be passed in to the logger when imported. See [Use](#use) below. It defaults to an empty string.
- Log levels are the Log4js defaults
- The category for the logger is "app"
- The category for the middleware is "http"

## Logger Function

After invoking the logger library, a logger function is exposed on the returned object and can be directly invoked. It has several functions corresponding to different log levels. Those functions accept a message. See [log4js usage](https://github.com/log4js-node/log4js-node#usage) for more information about invoking the logger function.

```
[2019-02-13 16:38:02.165] [INFO] [46245] [app] /index.spec.js : info test
```

## Logger Middleware

After the logger library is initialized with a config object, a middleware function is exposed on the returned object. It can be added to a middleware chain in an Connect/Express application. It uses the default configuration for the message using the same pattern as the logger function.

```
[2019-02-13 16:38:02.185] [INFO] [46245] [http] /index.spec.js : ::ffff:127.0.0.1 - - "GET / HTTP/1.1" 200 - "" "node-superagent/3.8.3"
```

## Logging Levels

Please refer to the documentation for the different logging levels. These have not been modified from the defaults for Log4js. [log4js usage](https://github.com/log4js-node/log4js-node#usage) shows the six defaults.

## Use

The factory function takes a single, optional `filename` parameter of type string. An easy way to get the path to the specific file that is importing the logger is to pass in the `__filename` global variable to the function. The library will figure out the relative path to the calling file from the project root and use that value in the log event.

```js
const boomerangLogger = require("@boomerang/boomerang-logging-middleware")(__filename);

const { logger, middleware } = boomerangLogger;

const app = express();

app.use(middleware)
// Logs all requests received to to this route and sub-routes
app.get("/data", (req, res) => res.json({ data: "data here" }));
});

app.get("/user", (req, res, next) => {
  logger.debug(`User endpoint called by ${req.user.email}`); // Assumes user object exists on request
  res.json(req.user);
});
```

## Examples

Please see an implementation of the middleware at [BoomerangDemoNodejs](https://github.ibm.com/Boomerang-Delivery/BoomerangDemoNodejs)
