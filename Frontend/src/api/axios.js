import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-website-hblg.onrender.com/api",
});

export default api;