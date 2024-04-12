const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const klanSchema = new mongoose.Schema({
  KlanUser: { type: String, default: "" },
  hak: { type: Number, default: 0 },
});

const klanSchemaExport = mongoose.model("clanschema", klanSchema);
module.exports = klanSchemaExport;
