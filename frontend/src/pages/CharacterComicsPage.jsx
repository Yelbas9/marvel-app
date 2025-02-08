import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const CharacterComicsPage = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterAndComics = async () => {
      try {
        const characterResponse = await axios.get(
          `${BASE_URL}/character/${characterId}`
        );
        setCharacter(characterResponse.data);

        const comicPromises = characterResponse.data.comics.map((comicId) =>
          axios.get(`${BASE_URL}/comic/${comicId}`)
        );

        const comicsResponses = await Promise.all(comicPromises);
        const comicsData = comicsResponses.map((response) => response.data);
        setComics(comicsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterAndComics();
  }, [characterId]);

  if (loading) {
    return <p style={{ color: "white", textAlign: "center" }}>Chargement...</p>;
  }

  return (
    <div className="character-comics-page">
      {character && (
        <div className="character-details">
          <h1>{character.name}</h1>
          <img
            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <p>{character.description || "Pas de description disponible."}</p>
        </div>
      )}

      <h2>Comics liés à {character?.name}</h2>
      <div className="comics-grid">
        {comics.length > 0 ? (
          comics.map((comic) => (
            <div key={comic._id} className="comic-card">
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h3>{comic.title}</h3>
              <p>{comic.description || "Pas de description disponible."}</p>
            </div>
          ))
        ) : (
          <p>Aucun comic trouvé pour ce personnage.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterComicsPage;
