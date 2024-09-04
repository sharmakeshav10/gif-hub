import React, { useContext, useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import SearchBar from "./SearchBar";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  const { gf } = GifState();

  const fetchCategories = async () => {
    try {
      const { data } = await gf.categories();

      setCategories(data);

      console.log(`categories`, data);
    } catch (error) {
      console.error(`categories`, error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        {/* image */}
        <div>
          <Link to="/">
            <img src="src\assets\giphy_logo.png" className="w-36" />
          </Link>
        </div>

        {/* categories */}
        <div className="flex items-center gap-1">
          {categories.slice(0, 5).map((category) => {
            return (
              <Link
                key={category.name}
                to={`${category.name_encoded}`}
                className="px-6 py-2 text-sm text-white font-bold hover:gradient border-b-4 border-b-blue-600 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 border-b-blue-600 text-white hidden lg:block`}
            />
          </button>

          {/* favorites button */}
          <div>
            <button className="bg-gray-500 px-6 py-1 pt-1 text-white rounded">
              Favorite GIFs
            </button>
          </div>

          {/* breadcrumb icon */}
          <div>
            <button onClick={() => setShowCategories(!showCategories)}>
              <HiMiniBars3
                size={25}
                className="py-0.5 hover:gradient border-b-4 border-b-blue-600 text-white block lg:hidden"
              />
            </button>
          </div>
        </div>
      </div>
      {/* ellipsis categories */}
      {showCategories && (
        <div className="w-full gradient p-4 mt-1 ">
          <span className="text-white text-2xl font-extrabold">Categories</span>
          <hr className="mt-2" />
          <div className="text-white grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category) => {
              return (
                <Link
                  to={`/${category.name_encoded}`}
                  className="p-2 hover:opacity-80 font-bold"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* searchbar */}
      <SearchBar />
    </div>
  );
};

export default Header;
