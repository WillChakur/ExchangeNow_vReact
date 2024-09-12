const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const routerRates = require("./routes/rates");
const routerUser = require("./routes/user");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "dist", "index.html"));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/rates", routerRates);
app.use("/user", routerUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
