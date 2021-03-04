const { appLogger, LOG } = require("../logger/logger");
const { generateSampleManage } = require("../managers/itemManager");
const fileHelper = require("../helpers/fileHelper");

const logger1 = (...args) => appLogger(LOG.WEB.ITEM.GENERATE_SAMPLE, ...args);

exports.generateSample = async (req, res) => {
  const sample = generateSampleManage();
  const result = fileHelper.bsonSerialize(sample);
  res.statusCode = 200;
  res.header("Content-Disposition", `attachment; filename="test.bson"`);
  res.header("Content-Length", result.length);
  res.header("cache-control", "public");
  res.contentType("application/octet-stream");
  res.write(result, "binary");
};
