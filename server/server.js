require("dotenv").config();
const express = require("express");
const cors = require("cors");

const route = require("./route");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route
app.use(route);

// Middleware Error Handling
// Semua Error yang ada di Project Api ini akan masuk ke middleware ini jika tidak ada yang menangani
app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
