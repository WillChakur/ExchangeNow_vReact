const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  insertRate,
  getTransactions,
  createTransactionsTable,
  createUserTransactionsTable,
} = require("../queries/index");
const logger = require("../logger");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Error to authenticate token" });
    }

    req.userId = decoded.id;
    next();
  });
};

(async () => {
  try {
    await createTransactionsTable();
    await createUserTransactionsTable();
    logger.info("Transaction table setup successfully");
  } catch (error) {
    logger.error("Error setting up the transaction table: ", error);
  }
})();

router.post("/:base/:target", verifyJWT, async (req, res) => {
  const base = req.params.base;
  const target = req.params.target;

  const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}&base=${base}&symbols=USD,CAD,EUR,GBP,BTC,JPY,BRL`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        if (req.userId) {
          insertRate(
            req.userId,
            data.timestamp,
            data.base,
            data.rates.BRL,
            data.rates.USD,
            data.rates.JPY,
            data.rates.EUR,
            data.rates.GBP,
            data.rates.BTC,
            data.rates.CAD,
          );
        }
        res.send(data);
      } else {
        const error = data.error;
        res.status(429).json({
          success: false,
          message: `API error: ${error.info} (code ${error.code})`,
        });
      }
    } else {
      res.status(response.status).json({
        success: false,
        message: `HTTP error: ${response.statusText}`,
      });
    }
  } catch (error) {
    logger.error("Fetch error:", error.message);
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while fetching data. Please try again later.",
    });
  }
});

router.get("/", verifyJWT, async (req, res) => {
  const transactions = getTransactions(req.userId);

  res.json({ message: req.userId, transactions: transactions });
});

module.exports = router;
