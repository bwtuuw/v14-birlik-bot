const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userID: { type: String, default: "" },
  usernameHistory: { type: [Schema.Types.Mixed], default: [] },
});

const userSchemaExport = mongoose.model("userSchema", userSchema);
module.exports = userSchemaExport;
