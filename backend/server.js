const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routerRates = require("./routes/rates");
const routerUser = require("./routes/user");
const session = require("express-session");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use("/rates", routerRates);
app.use("/user", routerUser);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
