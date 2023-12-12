const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timerSchema = new Schema({
  time: {
    //mettre en datetime plus tard
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Timer", timerSchema);
