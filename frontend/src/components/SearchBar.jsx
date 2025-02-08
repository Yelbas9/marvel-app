import React, { useState, useEffect, useRef } from "react";
import { autoCompleteCharacters } from "../services/api";

const SearchBar = ({ value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const data = await autoCompleteCharacters(value);
          setSuggestions(data);
        } catch (error) {
          console.error("Erreur lors de l'auto-complétion :", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleSelectSuggestion = (name) => {
    onChange(name);
    setSuggestions([]);
    inputRef.current.blur();
  };

  return (
    <div
      className="search-bar"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setTimeout(() => setIsFocused(false), 200)}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            <li key={s._id} onClick={() => handleSelectSuggestion(s.name)}>
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
