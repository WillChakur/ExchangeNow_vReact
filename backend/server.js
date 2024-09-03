const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routerRates = require("./routes/rates");
const routerUser = require("./routes/user");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/rates", routerRates);
app.use("/user", routerUser);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
