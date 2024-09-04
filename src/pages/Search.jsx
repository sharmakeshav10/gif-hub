import React, { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/Home/FilterGif";
import Gif from "../components/Home/Gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { gf, filter } = GifState();

  const { query } = useParams();
  console.log(query);

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevance",
      type: filter,
    });
    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div>
      {/* query */}
      <div className="flex items-end gap-4 mb-4">
        <h1 className="font-extrabold text-white text-4xl">{query}</h1>
        <span className="text-gray-400 font-semibold text-md">
          {searchResults.length} {filter}
        </span>
      </div>

      <FilterGif />

      {searchResults.length > 0 ? (
        <div className="columns-2 sm:columns-3 md:columns-4">
          {searchResults.map((res) => {
            return <Gif key={res.id} gif={res} />;
          })}
        </div>
      ) : (
        <div className="text-white font-extrabold text-5xl items-center">
          {/* Sorry, no {filter} for {query} available */}
        </div>
      )}
    </div>
  );
};

export default Search;
