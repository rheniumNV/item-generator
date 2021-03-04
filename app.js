require("dotenv").config();
const { appLogger, LOG } = require("./lib/logger/logger");
const { format, inspect } = require("./lib/helpers/helper");

const express = require("express");
const app = express();

//parse
const bodyParser = require("body-parser");
const boolParser = require("express-query-boolean");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(boolParser());

//logger
const systemLogger = require("./lib/logger/systemLogger");
const accessLogger = require("./lib/logger/accessLogger");
app.use(systemLogger());
app.use(accessLogger());

//access
app.use((req, _res, next) => {
  appLogger.info(
    LOG.APP.ROUTE,
    format(
      "ReceiveRequest %s %s body=%s",
      req.method,
      req.url,
      inspect(req.body)
    )
  );
  next();
});

//main
const router = require("./lib/router");
router.route(app);

//error
app.use((err, _req, res, _next) => {
  appLogger.error(LOG.UNKNOWN, err);
  res.status(500).send("error").send();
});

//routing not found
app.use((_req, res, _next) => {
  appLogger.warn(LOG.APP.ROUTE, "routing not found");
  res.status(404).send("NotFound").send();
});

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  const { host, port } = server.address();
  appLogger.info(
    LOG.APP.SERVER,
    format("Example app listening at http://%s:%s", host, port)
  );
});

appLogger.info(LOG.APP.SERVER, "App start");

//neosBot
const neosBot = require("./lib/neosBot/neosBot");
neosBot.login();
