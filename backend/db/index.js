const pg = require("pg");
const { Pool } = pg;
require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const query = async (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = query;
