const express = require("express");
const router = express.Router();
const {
  insertRate,
  getTransactions,
  createTransactionsTable,
  createUserTransactionsTable,
} = require("../queries/index");
const logger = require("../logger");
require("dotenv").config();

(async () => {
  try {
    await createTransactionsTable();
    await createUserTransactionsTable();
    logger.info("Transaction table setup successfully");
  } catch (error) {
    logger.error("Error setting up the transaction table: ", error);
  }
})();

router.post("/:base/:target", async (req, res) => {
  const base = req.params.base;
  const target = req.params.target;
  const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}&base=${base}&symbols=USD,CAD,EUR,GBP,BTC,JPY,BRL`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        if (req.session.userId) {
          insertRate(
            req.session.userId,
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

module.exports = router;
