import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import ComicsPage from "./pages/ComicsPage";
import FavoritesPage from "./pages/FavoritesPage";
import CharacterComicsPage from "./pages/CharacterComicsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route
                path="/characters/:characterId"
                element={<CharacterComicsPage />}
              />{" "}
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
