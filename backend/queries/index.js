let db = require("../db/index");
let logger = require("../logger");
let createUserTransactionsTable = async () => {
  let sql = ` CREATE TABLE IF NOT EXISTS userTransactions (
                userId INTEGER,
                transactionId INTEGER,
                PRIMARY KEY (userId, transactionId),
                FOREIGN KEY (userId) REFERENCES users(userId),
                FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
    )`;
  try {
    await db(sql);
    logger.info("userTransactions table created successfully");
  } catch (error) {
    logger.error("Error creating userTransactions table: ", error);
    throw error;
  }
};
let createTransactionsTable = async () => {
  let sql = ` CREATE TABLE IF NOT EXISTS transactions (
                transactionId INTEGER PRIMARY KEY,
                date TIMESTAMP,
                base VARCHAR(3),
                brl REAL,
                usd REAL,
                jpy REAL,
                eur REAL,
                gbp REAL,
                btc REAL,
                cad REAL 
    )`;
  try {
    await db(sql);
    logger.info("transactions table created successfully");
  } catch (error) {
    logger.error("Error creating transactions table: ", error);
    throw error;
  }
};

let insertRate = async (
  userId,
  timestamp,
  base,
  brl,
  usd,
  jpy,
  eur,
  gbp,
  btc,
  cad,
) => {
  let sqlT = `INSERT INTO transactions (transactionId, date, base, brl, usd, jpy, eur, gbp, btc, cad) VALUES ($1, TO_TIMESTAMP($2), $3, $4, $5, $6, $7, $8, $9, $10)`;
  let sqlUT = `INSERT INTO userTransactions (userId, transactionId) VALUES ($1, $2)`;
  const transactionId = generateRandomId();
  let values = [
    transactionId,
    timestamp,
    base,
    brl,
    usd,
    jpy,
    eur,
    gbp,
    btc,
    cad,
  ];
  try {
    await db(sqlT, values);
    await db(sqlUT, [userId, transactionId]);
    logger.info("Rate inserted successfully");
  } catch (error) {
    logger.error("Error inserting rate: ", error);
  }
};

let createUsersTable = async () => {
  let sql = ` CREATE TABLE IF NOT EXISTS users (
                userId SERIAL PRIMARY KEY,
                username VARCHAR(30),
                password VARCHAR(100),
                email VARCHAR(255) 
    )`;
  try {
    await db(sql);
    logger.info("users table created successfully");
  } catch (error) {
    logger.error("Error creating users table: ", error);
    throw error;
  }
};

let insertUser = async (username, password, email) => {
  let sql = ` INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
  let values = [username, password, email];
  try {
    await db(sql, values);
    logger.info("User registered successfully");
  } catch (error) {
    logger.error("Error registering user: ", error);
  }
};
let getUser = async (username) => {
  let sql = `SELECT * FROM users WHERE username = $1`;
  let values = [username];
  try {
    let result = await db(sql, values);
    return result;
  } catch (error) {
    logger.error("Error getting user: ", error);
  }
};

const getTransactions = async (userId) => {
  let sql = `SELECT t.transactionId, t.date, t.base, t.brl, t.usd, t.jpy, t.eur, t.gbp, t.btc, t.cad
    FROM transactions t
    JOIN userTransactions ut ON t.transactionId = ut.transactionId
    WHERE ut.userId = $1;`;
  let values = [userId];
  try {
    let result = await db(sql, values);
    if (result.rows.length === 0) {
      console.log("No transactions found for this user.");
      return [];
    } else {
      return result.rows;
    }
  } catch (error) {
    logger.error("Error getting user transactions: ", error);
    throw error;
  }
};

function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 2147483646) + 1;
  const randomId = randomNumber.toString().padStart(10, "0");
  return randomId;
}

module.exports = {
  createUserTransactionsTable,
  createTransactionsTable,
  createUsersTable,
  insertUser,
  getUser,
  insertRate,
  getTransactions,
};
