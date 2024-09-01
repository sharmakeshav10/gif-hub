import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  //for all the gifs
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
