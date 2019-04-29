const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "Success" });
});

const PORT = process.env.PORT || 9000

app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))
