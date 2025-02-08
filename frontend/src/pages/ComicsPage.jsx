import React, { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";
import SearchBar from "../components/SearchBar";

const ComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 100;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get("http://localhost:4000/comics", {
          params: {
            title: search,
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
          },
        });

        setComics(response.data.results);
        setHasMore(response.data.results.length === itemsPerPage);
      } catch (error) {
        console.error("Erreur lors de la récupération des comics :", error);
      }
    };

    const fetchFavorites = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:4000/favorites", {
            headers: { Authorization: token },
          });
          setFavorites(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris :", error);
        }
      }
    };

    fetchComics();
    fetchFavorites();
  }, [search, currentPage, token]);

  const handleFavorite = async (comicId) => {
    if (!token) {
      alert("Veuillez vous connecter pour ajouter des favoris.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:4000/favorites",
        { comicId },
        { headers: { Authorization: token } }
      );
      setFavorites((prev) => [...prev, comicId]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  const isFavorite = (comicId) => favorites.includes(comicId);

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

  return (
    <div className="comics-page">
      <h1>Liste des Comics</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un comic..."
      />

      <div className="comics-grid">
        {comics.map((comic) => (
          <ComicCard
            key={comic._id}
            comic={comic}
            isFavorite={isFavorite(comic._id)}
            handleFavorite={handleFavorite}
          />
        ))}
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

export default ComicsPage;
