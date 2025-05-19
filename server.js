const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./routes/api");
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

mongoose
  .connect(
    "mongodb+srv://ajesh:kandavath@cluster0.zsgbf.mongodb.net/maymern24?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to db");

    app.listen(PORT, () => {
      console.log("server running on PORT: " + PORT);
    });
  })
  .catch((err) => {
    console.log("db connection error", +err);
  });
