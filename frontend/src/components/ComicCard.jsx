import React from "react";

const ComicCard = ({ comic, isFavorite, handleFavorite }) => {
  return (
    <div className="comic-card">
      <button
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite(comic._id);
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img
        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <div className="comic-info">
        <h3>{comic.title}</h3>
        <p>
          {comic.description
            ? comic.description
            : "Pas de description disponible."}
        </p>
      </div>
    </div>
  );
};

export default ComicCard;
