const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  server_id: String,
  name: String,
  birthdays: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  ],
});

module.exports = Server = mongoose.model("Server", serverSchema);
