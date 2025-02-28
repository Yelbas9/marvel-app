import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersResponse = await axios.get(
          `${BASE_URL.replace(/\/$/, "")}/characters`,
          {
            params: { limit: 10 },
          }
        );

        const comicsResponse = await axios.get(
          `${BASE_URL.replace(/\/$/, "")}/comics`,
          {
            params: { limit: 10 },
          }
        );

        setCharacters(charactersResponse.data.results);
        setComics(comicsResponse.data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", color: "white" }}>
        Chargement en cours...
      </p>
    );
  }

  return (
    <div className="home-container">
      <div className="section">
        <h2 className="section-title">Personnages</h2>
        <div className="items-list">
          {characters.map((char) => (
            <div key={char._id} className="item-card">
              <img
                src={`${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`}
                alt={char.name}
              />
              <h3>{char.name}</h3>
            </div>
          ))}
        </div>
        <Link to="/characters" className="see-all-button">
          Voir tous les personnages
        </Link>
      </div>

      <div className="section">
        <h2 className="section-title">Comics</h2>
        <div className="items-list">
          {comics.map((comic) => (
            <div key={comic._id} className="item-card">
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h3>{comic.title}</h3>
            </div>
          ))}
        </div>
        <Link to="/comics" className="see-all-button">
          Voir tous les comics
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
