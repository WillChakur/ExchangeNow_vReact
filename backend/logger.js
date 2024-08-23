const winston = require("winston");
require("winston-daily-rotate-file");

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.cli(),
  transports: [
    new winston.transports.File({
      filename: "./logs/combined.log",
    }),
    new winston.transports.File({
      filename: "./logs/app-error.log",
      level: "error",
    }),
    fileRotateTransport,
    new winston.transports.Console({
      level: "info",
    }),
  ],
  defaultMeta: {
    service: "admin-service",
  },
  exceptionHandlers: [
    new winston.transports.File({ filename: "./logs/exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "./logs/rejections.log" }),
  ],
});

module.exports = logger;
