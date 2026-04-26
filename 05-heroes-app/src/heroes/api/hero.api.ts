import axios from "axios";

const HERO_URL = import.meta.env.VITE_API_URL;

export const heroApi = axios.create({
  baseURL: `${HERO_URL}/api/heroes`,
});
