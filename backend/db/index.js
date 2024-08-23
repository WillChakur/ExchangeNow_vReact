import pg from "pg";
const { Pool } = pg;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

export const query = (text, params) => {
  return pool.query(text, params);
};
