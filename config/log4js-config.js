const path = require("path");
const APP_ROOT = path.join(__dirname, "../");

module.exports = {
  appenders: {
    consoleLog: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[%f{1}:%l  %d{yyyy-MM-dd} %r %p %m %]",
      },
    },
    systemLog: {
      type: "file",
      filename: path.join(APP_ROOT, "./log/system/system.log"),
      maxLogSize: 5000000,
      backups: 5,
      compress: true,
    },
    applicationLog: {
      type: "multiFile",
      base: path.join(APP_ROOT, "./log/application/"),
      property: "key",
      extension: ".log",
      maxLogSize: 5000000,
      backups: 5,
      compress: true,
    },
    accessLog: {
      type: "dateFile",
      filename: path.join(APP_ROOT, "./log/access/access.log"),
      pattern: "yyyy-MM-dd",
      daysToKeep: 5,
      compress: true,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ["consoleLog"],
      level: "ALL",
    },
    system: {
      appenders: ["systemLog", "consoleLog"],
      level: "ERROR",
    },
    application: {
      appenders: ["applicationLog", "consoleLog"],
      level: "ALL",
    },
    access: {
      appenders: ["accessLog"],
      level: "INFO",
    },
  },
};
