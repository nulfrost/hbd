const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  user_name: String,
  birth_month: String,
  birth_day: Number,
});

module.exports = User = mongoose.model("User", userSchema);
