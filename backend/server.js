const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let selection = { shape: "Square", color: "Red" };

app.get("/selection", (req, res) => {
  res.json(selection);
});

app.post("/update", (req, res) => {
  selection = req.body;
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
