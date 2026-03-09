import { useEffect, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";

interface Props {
  gifs: Gif[];

  onGetGifUrl?: (url: string) => string;
}

export const GifList = ({ gifs, onGetGifUrl }: Props) => {
  const [successMsg, setSuccessMsg] = useState<{ id: string; msg: string }[]>(
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      setSuccessMsg([]);
    }, 5000);
  }, [successMsg]);

  const handleClick = (id: string, url: string) => {
    if (!onGetGifUrl) return;

    setSuccessMsg([...successMsg, { id, msg: onGetGifUrl(url) }]);
  };

  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div
          key={gif.id}
          className="gif-card"
          onClick={() => handleClick(gif.id, gif.url)}
        >
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <span style={{ height: 22, color: "whitesmoke", fontWeight: "bold" }}>
            {successMsg.find((msg) => msg.id == gif.id)?.msg}
          </span>
          <p>
            {gif.width}x{gif.height}(1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
