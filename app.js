const express = require("express");

const cors = require("cors");

const itemsData = require("./itemsData.json");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ data: "Service is running!" });
});

app.get("/items", (req, res) => {
  const { items } = itemsData;
  try {
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/items/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { items } = itemsData;

    const item = items.find((item) => item.id === id);

    if (item) {
      res.status(200).json({ data: item });
    } else {
      res.status(400).json({ error: `Item with id: ${id} does not exist` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
