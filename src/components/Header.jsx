import React, { useState } from "react";
import { HiEllipsisVertical, HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* image */}
        <div>
          <img src="src\assets\giphy_logo.png" className="w-36" />
        </div>

        {/* categories */}
        <div className="flex items-center">
          <Link
            to="/"
            className="px-6 py-2 text-sm text-white font-bold hover:gradient border-b-4 border-b-blue-600 hidden lg:block"
          >
            Reactions
          </Link>
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
            <button>
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
          <span className="text-white text-2xl font-bold">Categories</span>
          <hr />
          <div className="text-white">
            <Link>Reactions</Link>
          </div>
        </div>
      )}

      {/* searchbar */}
    </div>
  );
};

export default Header;
