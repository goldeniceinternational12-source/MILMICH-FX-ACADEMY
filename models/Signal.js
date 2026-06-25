const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema(
  {
    pair: String,
    entry: Number,
    stopLoss: Number,
    takeProfit: Number,
    status: {
      type: String,
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signal", signalSchema);