import React, { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = async () => {
    if (query.length == 0) {
      return;
    }

    navigate(`/search/${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="flex pt-4 pb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search all the GIFs and stickers"
        className="w-full rounded-tl rounded-bl pl-3 pr-14 py-5 outline-none text-lg"
      />
      {query && (
        <button
          className="text-gray-600 absolute right-96 mr-2 top-16 opacity-45"
          onClick={() => setQuery("")}
        >
          <IoIosCloseCircleOutline size={22} />
        </button>
      )}
      <button
        onClick={search}
        className="bg-gradient-to-tr from-pink-600 to-pink-300 text-white px-5  rounded-tr rounded-br"
      >
        <HiMiniMagnifyingGlass size={30} />
      </button>
    </div>
  );
};

export default SearchBar;
