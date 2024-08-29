const { createUsersTable, insertUser, getUser } = require("../queries/index");
const bcrypt = require("bcrypt");
const logger = require("../logger");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;

(async () => {
  try {
    await createUsersTable();
    logger.info("Users table setup successfully");
  } catch (error) {
    logger.error("Error setting up the users table: ", error);
  }
})();

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

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    await insertUser(username, hashedPassword, email);
    res.status(200).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await getUser(username);

    if (data.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const user = data.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const id = user.userid;

    const token = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: 300,
    });

    res.json({ auth: true, token: token, result: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
