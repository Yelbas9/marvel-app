const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comicId: { type: String, default: null },
  characterId: { type: String, default: null },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
