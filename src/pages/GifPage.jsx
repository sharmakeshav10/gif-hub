import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Home/Gif";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa";

const GifPage = () => {
  const [gif, setGif] = useState([]);
  const { type, slug } = useParams();
  const [relatedGif, setRelatedGif] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1]);

    setGif(data);
    setRelatedGif(related);
  };

  useEffect(() => {
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 text-white">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            {/* image and name */}
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold text-white">
                  {gif?.user?.display_name}
                </div>
                <div className="text-gray-400">@{gif?.user?.username}</div>
              </div>
            </div>
            {/* description */}
            {gif?.user?.description && (
              <p className="text-sm text-gray-400 py-4">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center font-bold cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <div>
                      Read Less <HiMiniChevronUp size={20} />{" "}
                    </div>
                  ) : (
                    <div>
                      Read More <HiMiniChevronDown />{" "}
                    </div>
                  )}
                </div>
              </p>
            )}
          </>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="mb-2 text-slate-400 text-sm font-semibold">
              {gif.title}
            </div>
            <Gif gif={gif} hover={false} />

            {/* mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold text-white">
                  {gif?.user?.display_name}
                </div>
                <div className="text-gray-400">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          {/* fav/share/embed */}
        </div>

        {/* related gifs */}
        <div className="pt-4">
          <span className="text-sm text-gray-400 font-bold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-3 pt-1">
            {relatedGif.slice(1).map((gif) => {
              return <Gif gif={gif} key={gif.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
