import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import marvelLogo from "../assets/marvel_Logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={marvelLogo} alt="Marvel Logo" className="logo-img" />
      </Link>

      <nav className="nav-links">
        <Link to="/characters">Personnages</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favoris</Link>

        {user ? (
          <button onClick={logout} className="logout-button">
            Se Déconnecter
          </button>
        ) : (
          <>
            <Link to="/login">Se Connecter</Link>
            <Link to="/signup">S'inscrire</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
