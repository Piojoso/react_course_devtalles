import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";
import { giphyAPI } from "../api/giphy.api";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyAPI<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });

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
