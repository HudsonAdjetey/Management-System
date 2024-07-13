const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

// create a log event
const logEvent = async function (message, fileName) {
  const timeStamp = format(new Date(), "yyy-MM-dd'T'HH:mm:ss'Z'");
  const logEntry = `${timeStamp} ${uuid()} ${message}\n`;

  try {
    // check if the file exist
    if (!fs.existSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logEntry
    );
  } catch (err) {
    console.log(err);
  }
};

// creating a logger
const logger = (req, res, next) => {
  logEvent(`Starting ${req.method} ${req.originalUrl}`, "request.log");
  next();
};

module.exports = {
  logger,
  logEvent,
};
