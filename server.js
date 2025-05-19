const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./routes/api");
const PORT = process.env.PORT || 3000;
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");

    app.listen(PORT, () => {
      console.log("server running on PORT: " + PORT);
    });
  })
  .catch((err) => {
    console.log("db connection error", +err);
  });
