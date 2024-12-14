import React from "react";

import { HiMiniHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../../context/gif-context";
import toast from "react-hot-toast";
import { IoIosLink } from "react-icons/io";

const Gif = ({ gif, hover = true }) => {
  const { favorites, addToFavorites, removeFromFavorites } = GifState();

  return (
    <>
      <Link to={`/${gif.type}/${gif.slug}`}>
        <div className="w-full aspect-video mb-2 relative bg-png-pattern cursor-pointer group">
          <img
            className="w-full object-cover rounded transition-all duration-300"
            alt={gif.title}
            src={gif?.images?.fixed_width?.url}
          />

          {hover && (
            <>
              <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
                <img
                  className="h-10"
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                />
                <span className="text-white text-xs sm:text-md">
                  {gif?.user?.display_name}
                </span>
              </div>
              <div className="absolute top-0 flex items-center gap-3 mt-2 ml-2 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                {/* favorite */}
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    favorites.includes(gif?.id)
                      ? removeFromFavorites(gif?.id)
                      : addToFavorites(gif?.id);
                  }}
                >
                  <HiMiniHeart
                    size={25}
                    className={`${
                      favorites.includes(gif?.id)
                        ? "text-red-600"
                        : "text-white"
                    }`}
                  />
                </button>
                <div
                  className="text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(gif?.images?.original?.url);
                    toast.success("Copied to Clipboard");
                  }}
                >
                  <IoIosLink size={20} />
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default Gif;
