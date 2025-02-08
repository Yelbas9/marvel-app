import axios from "axios";

const API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const signup = async (email, password) => {
  return await api.post("/auth/signup", { email, password });
};

export const fetchFavorites = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:4000/favorites", {
    headers: { Authorization: token },
  });
  return response.data;
};

export const toggleFavorite = async (comicId) => {
  const response = await api.post("/favorites", { comicId });
  return response.data;
};

export const autoCompleteCharacters = async (query) => {
  const response = await api.get("/autocomplete/characters", {
    params: { query },
  });
  return response.data;
};

export default api;
