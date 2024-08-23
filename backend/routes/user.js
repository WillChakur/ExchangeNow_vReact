const { createUsersTable, insertUser, getUser } = require("../queries/index");
const bcrypt = require("bcrypt");
const logger = require("../logger");
const express = require("express");
const router = express.Router();
const saltRounds = 10;

(async () => {
  try {
    await createUsersTable();
    logger.info("Users table setup successfully");
  } catch (error) {
    logger.error("Error setting up the users table: ", error);
  }
})();

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

    if (data.rows.length > 0) {
      bcrypt.compare(password, data.rows[0].password, (err, result) => {
        if (result) {
          res.status(200).send("Login successful");
          userId = data.rows[0].userId;
          req.session.userId = userId;

          // DIRECT THE USER TO THE HOME PAGE
        } else {
          res.status(401).send("Invalid password");
        }
      });
    } else {
      res.status(401).send("Invalid username");
    }
  } catch (error) {
    res.status(500).send("Error logging in", error);
  }
});

module.exports = router;
