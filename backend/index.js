const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { authenticateToken } = require("./middleware/auth");
const User = require("./models/User");
const favoritesRoutes = require("./routes/favorites");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((error) =>
    console.error("❌ Erreur de connexion MongoDB Atlas", error)
  );

const API_KEY = process.env.MARVEL_API_KEY;
const BASE_URL = "https://lereacteur-marvel-api.herokuapp.com";

app.use("/auth", authRoutes);

app.get("/characters", async (req, res) => {
  try {
    const { name, limit = 100, skip = 0 } = req.query;
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: { apiKey: API_KEY, name, limit, skip },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const { title, limit = 100, skip = 0 } = req.query;
    const response = await axios.get(`${BASE_URL}/comics`, {
      params: { apiKey: API_KEY, title, limit, skip },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const response = await axios.get(`${BASE_URL}/character/${characterId}`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage :", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/comic/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    const response = await axios.get(`${BASE_URL}/comic/${comicId}`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération du comic :", error);
    res.status(500).json({ message: error.message });
  }
});

app.use("/favorites", favoritesRoutes);

app.get("/autocomplete/characters", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: { apiKey: API_KEY, name: query, limit: 5 },
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
