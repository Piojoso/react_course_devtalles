import axios from "axios";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const giphyAPI = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  params: {
    api_key: GIPHY_API_KEY,
    lang: "es",
  },
});
