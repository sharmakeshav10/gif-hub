import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return <GifContext.Provider value={{ gf }}>{children}</GifContext.Provider>;
};
