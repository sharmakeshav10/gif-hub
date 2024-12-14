import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  //for all the gifs
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (id) => {
    if (favorites.includes(id)) {
      const updatedFav = favorites.filter((item) => item !== id);
      setFavorites(updatedFav);
      localStorage.setItem("favGIFs", JSON.stringify(updatedFav));
    } else {
      const updatedFav = [...favorites];
      updatedFav.push(id);
      setFavorites(updatedFav);
      localStorage.setItem("favGIFs", JSON.stringify(updatedFav));
    }
  };

  const removeFromFavorites = (id) => {
    const updatedFav = favorites.filter((item) => item !== id);
    setFavorites(updatedFav);
    localStorage.setItem("favGIFs", JSON.stringify(updatedFav));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favGIFs"));
    setFavorites(favorites);
  }, []);

  const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <GifContext.Provider
      value={{
        giphyFetch,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
