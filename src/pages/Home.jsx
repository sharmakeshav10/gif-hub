import React, { useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Home/Gif";
import FilterGif from "../components/Home/FilterGif";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrending = async () => {
    const { data } = await gf.trending({
      type: filter,
      rating: "g",
    });

    setGifs(data);
  };

  useEffect(() => {
    fetchTrending();
  }, [filter]);

  return (
    <div>
      {/* gif/stickers/text button */}
      <FilterGif showTrendingLabel={true} />

      {/* gifs on home page */}
      <div className="columns-2 sm:columns-3 md:columns-4">
        {gifs.map((gif) => {
          return <Gif key={gif.id} gif={gif} />;
        })}
      </div>
    </div>
  );
};

export default Home;
