/* eslint no-unused-vars: 0 */
const util = require("util");
const { join, map, filter, get } = require("lodash");

exports.format = (...args) => util.format(...args);
exports.inspect = (...args) => util.inspect(...args);

//lodash
exports.join = (...args) => join(...args);
exports.map = (...args) => map(...args);
exports.filter = (...args) => filter(...args);
exports.get = (...args) => get(...args);
