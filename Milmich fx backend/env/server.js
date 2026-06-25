require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB =
require("./config/db");
const authRoutes =
require("./routes/authRoutes");

const otpRoutes =
require("./routes/otpRoutes");

const app = express();
connectDB();

app.use(cors());

app.use(express.json());

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/otp",
otpRoutes
);
app.listen(
process.env.PORT,
() => {
console.log(
"Server running"
);
}
);