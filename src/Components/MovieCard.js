import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setWatching } from "../utils/videoStore";

const MovieCard = ({ movie, w }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { title, poster_path, overview, id, original_title, key } = movie;

  return (
    <div className="transition-all ease-in-out rounded-md py-4 w-90 tracking-[-0.015em] text-white intersection  px-2 hover:bg-gradient-to-tl from-red-600/25 to-black">
      <div className="hovering-element absolute"></div>
      <img
        onClick={() => {
          navigate(`/watch/${key}?id=${id}`);
          dispatch(setWatching(movie));
        }}
        className={`w-[100%] h-60 bg-cover cursor-pointer`}
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${key}/hqdefault.jpg)`,
          clipPath: "inset(1px)",
        }}
      />
      <p>
        {title || original_title} <br /> {overview.slice(0, 40)}...
      </p>
    </div>
  );
};

export default MovieCard;
