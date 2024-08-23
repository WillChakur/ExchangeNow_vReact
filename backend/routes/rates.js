const express = require("express");
const router = express.Router();
const { insertRate, getTransactions } = require("../queries/index");
const logger = require("../logger");
require("dotenv").config();

router.post("/insertTransaction", async (req, res) => {
  const { base, target } = req.query;
  const url = `https://api.exchangeratesapi.io/v1/2013-12-24?access_key=${process.env.API_KEY}&${base}=GBP&symbols=USD,CAD,EUR,GBP,BTC,JPY,BRL`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const userId = req.session.userId;
        insertRate(
          userId,
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

router.get("/getTransactions", async (req, res) => {
  let transactions = getTransactions(req.session.userId);
});

module.exports = router;
