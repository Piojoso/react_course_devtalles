import axios from "axios";
import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await axios.get<GiphyResponse>(
    "https://api.giphy.com/v1/gifs/search",
    {
      params: {
        api_key: GIPHY_API_KEY,
        q: query,
        limit: 10,
        lang: "es",
      },
    },
  );

  return response.data.data.map(
    (gif): Gif => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: Number(gif.images.original.width),
      height: Number(gif.images.original.width),
    }),
  );
};
