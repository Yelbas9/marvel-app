import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 100;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get("/characters", {
          params: {
            name: search,
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
          },
        });
        setCharacters(response.data.results || []);
        setHasMore(response.data.results.length === itemsPerPage);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des personnages :",
          error
        );
        setError("Impossible de charger les personnages.");
      }
    };

    const fetchFavorites = async () => {
      if (token) {
        try {
          const response = await api.get("/favorites", {
            headers: { Authorization: token },
          });
          setFavorites(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris :", error);
        }
      }
    };

    fetchCharacters();
    fetchFavorites();
  }, [search, currentPage, token]);

  const handleFavorite = async (characterId) => {
    if (!token) {
      alert("Veuillez vous connecter pour ajouter des favoris.");
      return;
    }
    try {
      await api.post(
        "/favorites",
        { characterId },
        { headers: { Authorization: token } }
      );
      setFavorites((prev) => [...prev, characterId]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  const isFavorite = (characterId) => favorites.includes(characterId);

  const handleCharacterClick = (characterId) => {
    navigate(`/characters/${characterId}`);
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="characters-page">
      <h1>Liste des personnages</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un personnage..."
      />

      <div className="characters-grid">
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard
              key={character._id}
              character={character}
              isFavorite={isFavorite(character._id)}
              handleFavorite={handleFavorite}
              onClick={() => handleCharacterClick(character._id)}
            />
          ))
        ) : (
          <p>Aucun personnage trouvé.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Précédent
        </button>

        <span>Page {currentPage}</span>

        <button onClick={handleNextPage} disabled={!hasMore}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
