const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timerSchema = new Schema({
  time: { 
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type :Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Timer", timerSchema);
