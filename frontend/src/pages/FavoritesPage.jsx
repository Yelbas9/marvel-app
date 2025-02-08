import React, { useEffect, useState } from "react";
import { fetchFavorites, toggleFavorite } from "../services/api";
import ComicCard from "../components/ComicCard";
import CharacterCard from "../components/CharacterCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
      }
    };
    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (item) => {
    try {
      await toggleFavorite(item._id, item.title ? "comicId" : "characterId");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav._id !== item._id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Mes Favoris</h1>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p style={{ color: "gray" }}>Aucun favori ajouté pour le moment.</p>
        ) : (
          favorites.map((item) =>
            item.title ? (
              <ComicCard
                key={item._id}
                comic={item}
                isFavorite={true}
                handleFavorite={() => handleRemoveFavorite(item)}
              />
            ) : (
              <CharacterCard
                key={item._id}
                character={item}
                isFavorite={true}
                handleFavorite={() => handleRemoveFavorite(item)}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
