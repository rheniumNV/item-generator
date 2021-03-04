const logger = require("./logger").system;

module.exports = (_options) => (err, _req, _res, next) => {
  logger.error(err.message);
  next(err);
};
