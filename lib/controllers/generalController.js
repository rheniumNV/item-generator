const { appLogger, LOG } = require("../logger/logger");

exports.hello = async (req, res) => {
  appLogger.debug(LOG.WEB.GENERAL.HELLO, "hello");
  res.send("hello");
};
