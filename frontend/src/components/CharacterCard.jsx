import React from "react";

const CharacterCard = ({ character, isFavorite, handleFavorite, onClick }) => {
  return (
    <div className="character-card" onClick={onClick}>
      <img
        src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <div className="character-info">
        <h3>{character.name}</h3>
        <p>{character.description || "Pas de description disponible."}</p>
        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite(character._id);
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
