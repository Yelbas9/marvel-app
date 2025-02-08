const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const axios = require("axios");
const { authenticateToken } = require("../middleware/auth");

const API_KEY = process.env.MARVEL_API_KEY;
const BASE_URL = "https://lereacteur-marvel-api.herokuapp.com";

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Récupération des favoris pour l'utilisateur :", userId);

    const favorites = await Favorite.find({ userId });
    console.log("Favoris trouvés :", favorites);

    const comicDetails = await Promise.all(
      favorites
        .filter((fav) => fav.comicId)
        .map(async (fav) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/comic/${fav.comicId}`,
              {
                params: { apiKey: process.env.MARVEL_API_KEY },
              }
            );
            console.log(
              `Détails du comic ${fav.comicId} récupérés avec succès.`
            );
            return response.data;
          } catch (error) {
            console.error(
              `❌ Erreur pour le comic ${fav.comicId}:`,
              error.response?.data || error.message
            );
            return null;
          }
        })
    );

    const characterDetails = await Promise.all(
      favorites
        .filter((fav) => fav.characterId)
        .map(async (fav) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/character/${fav.characterId}`,
              {
                params: { apiKey: process.env.MARVEL_API_KEY },
              }
            );
            console.log(
              `Détails du personnage ${fav.characterId} récupérés avec succès.`
            );
            return response.data;
          } catch (error) {
            console.error(
              `❌ Erreur pour le personnage ${fav.characterId}:`,
              error.response?.data || error.message
            );
            return null;
          }
        })
    );

    const results = [
      ...comicDetails.filter(Boolean),
      ...characterDetails.filter(Boolean),
    ];

    console.log(
      `Nombre total de favoris récupérés avec succès : ${results.length}`
    );
    res.json(results);
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération des favoris :",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { comicId, characterId } = req.body;
    const userId = req.user.userId;

    if (!comicId && !characterId) {
      return res.status(400).json({ error: "comicId ou characterId requis." });
    }

    const existingFavorite = await Favorite.findOne({
      userId,
      comicId: comicId || null,
      characterId: characterId || null,
    });

    if (existingFavorite) {
      await Favorite.deleteOne({ _id: existingFavorite._id });
      console.log("Favori supprimé :", existingFavorite);
    } else {
      const newFavorite = new Favorite({ userId, comicId, characterId });
      await newFavorite.save();
      console.log("Nouveau favori ajouté :", newFavorite);
    }

    const updatedFavorites = await Favorite.find({ userId });
    res.json(updatedFavorites);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des favoris :", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Favorite.deleteOne({ _id: req.params.id, userId: req.user.userId });
    const updatedFavorites = await Favorite.find({ userId: req.user.userId });
    res.json(updatedFavorites);
  } catch (error) {
    console.error("Erreur lors de la suppression du favori :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du favori" });
  }
});

module.exports = router;
