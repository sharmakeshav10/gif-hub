import React, { useState } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { GifState } from "../../context/gif-context";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGif = ({ showTrendingLabel = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div className="flex justify-between flex-col sm:flex-row">
      {/* trending label */}
      {showTrendingLabel && (
        <div className="flex items-center gap-2">
          <span className="text-white">
            <IoMdTrendingUp />
          </span>
          <span className="text-gray-500">Trending</span>
        </div>
      )}

      {/* filter buttons */}
      <div className="bg-gray-800 rounded-full min-w-80 flex py-2">
        {filters.map((f) => {
          return (
            <span
              key={f.title}
              onClick={() => setFilter(f.value)}
              className={`text-white w-1/3 rounded-full text-center cursor-pointer ${
                filter === f.value ? f.background : ""
              }`}
            >
              {f.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
