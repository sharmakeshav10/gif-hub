import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Home/Gif";

const Category = () => {
  const [results, setResults] = useState([]);

  const { gf } = GifState();

  const { category } = useParams();

  const fetchResults = async () => {
    const { data } = await gf.gifs(category, category);

    console.log(data);

    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-4">
      {/* left side */}
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]} />}
        <span className="text-gray-400 text-sm">
          Don't tell it me, GIF it to me
        </span>
      </div>

      {/* right side */}
      <div>
        <h2 className="text-4xl text-white font-bold capitalize pb-1">
          {category.split("-").join(" & ")} GIFS
        </h2>
        <h2 className="text-md text-gray-400 font-bold cursor-pointer hover:text-white pb-8">
          @{category}
        </h2>

        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {results.slice(1).map((gif) => {
              return <Gif gif={gif} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
