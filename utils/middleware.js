const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("----------BEGIN----------");
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("-----------END-----------");

  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name == "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if ((error.name = "ValidationError")) {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestLogger, errorHandler, unknownEndpoint };
