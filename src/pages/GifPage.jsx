import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Home/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { ImEmbed } from "react-icons/im";
import { IoIosLink } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

const GifPage = () => {
  const [gif, setGif] = useState([]);
  const { slug } = useParams();
  const [relatedGif, setRelatedGif] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { giphyFetch, addToFavorites, favorites, removeFromFavorites } =
    GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await giphyFetch.gif(gifId[gifId.length - 1]);
    const { data: related } = await giphyFetch.related(
      gifId[gifId.length - 1],
      { limit: 10 }
    );

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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    favorites.includes(gif?.id)
                      ? removeFromFavorites(gif?.id)
                      : addToFavorites(gif?.id);
                  }}
                >
                  <CiHeart
                    size={25}
                    className={`${
                      favorites.includes(gif?.id) ? "text-red-600" : ""
                    }`}
                  />
                </button>
                <button
                  className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(gif?.images?.original?.url);
                    toast.success("Copied to Clipboard");
                  }}
                >
                  <IoIosLink size={25} />
                </button>
              </div>
            </div>
          </div>

          {/* fav/share/embed */}
          <div className="hidden mt-16 sm:flex flex-col gap-6">
            {/* favorite */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                favorites.includes(gif?.id)
                  ? removeFromFavorites(gif?.id)
                  : addToFavorites(gif?.id);
              }}
            >
              <HiMiniHeart
                size={25}
                className={`${
                  favorites.includes(gif?.id) ? "text-red-600" : ""
                }`}
              />
              <p>Favorite</p>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={(e) => {
                navigator.clipboard.writeText(gif?.images?.original?.url);
                toast.success("Copied to Clipboard");
              }}
            >
              <IoIosLink size={20} />
              <p>Share</p>
            </div>
            {/* <div className="flex gap-3">
              <ImEmbed size={25} />
              <p>Embed</p>
            </div> */}
          </div>
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
