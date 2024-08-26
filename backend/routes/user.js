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

    if (data.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const user = data.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.userId = user.userId;
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
