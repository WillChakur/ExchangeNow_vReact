const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
