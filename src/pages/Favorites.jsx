import React, { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/Home/Gif";

const Favorites = () => {
  const [favGIFs, setFavGIFs] = useState([]);

  const { giphyFetch, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    if (favorites.length > 0) {
      const { data } = await giphyFetch.gifs(favorites);
      setFavGIFs(data);
    } else {
      setFavGIFs([]);
    }
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favorites]);

  return (
    <div>
      <h3 className="text-gray-400">My Favorites</h3>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-2 mt-2">
        {favGIFs.length > 0 ? (
          favGIFs.map((gif) => {
            return <Gif key={gif.id} gif={gif} />;
          })
        ) : (
          <h1 className="text-gray-400">No Favorites Found</h1>
        )}
      </div>
    </div>
  );
};

export default Favorites;
