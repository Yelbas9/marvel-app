import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const getComics = async () => {
  const response = await api.get("/comics");
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const signup = async (email, password) => {
  return await api.post("/auth/signup", { email, password });
};

export const fetchFavorites = async () => {
  const response = await api.get("/favorites");
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
