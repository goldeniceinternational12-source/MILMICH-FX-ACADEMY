const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://milmich-fx-academy.vercel.app"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});