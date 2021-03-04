const fs = require("fs");

const bson = require("bson");
exports.bsonSerialize = (...args) => bson.serialize(...args);

exports.saveFile = async (fileName, body) => {
  fs.writeFileSync(fileName, body, "binary");
};
