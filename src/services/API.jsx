import axios from "axios";

const baseURL = "http://localhost:7070";

// Ejemplos de uso, modificar para usar la nueva API
const API = {
  getMovieById: (movieId) => axios.get(`${baseURL}/content/${movieId}`),
  getTopMovies: () => axios.get(`${baseURL}/content/top`),
  getLatestMovies: () => axios.get(`${baseURL}/content/latest`),
  getCategoryById: (categoryId) =>
    axios.get(`${baseURL}/categories/${categoryId}`),
  getCategories: () => axios.get(`${baseURL}/categories`),
  saveReview: (token, movieId, text, stars) =>
    axios.post(
      `${baseURL}/content/${movieId}`,
      { text, stars },
      { headers: { Authorization: token } }
    ),
  login: (email, password) =>
    axios.post(`${baseURL}/login`, {
      email: email,
      password: password,
    }),
  signUp: (email, password, imageUrl, name) =>
    axios.post(`${baseURL}/register`, {
      email: email,
      password: password,
      image: imageUrl,
      name: name,
    }),
  getUserById: (userId) => axios.get(`${baseURL}/user/${userId}`),
};

export default API;
