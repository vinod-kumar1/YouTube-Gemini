import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setWatvhing } from "../utils/videoStore";

const MovieCard = ({ movie, w }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { title, poster_path, overview, id, original_title, key } = movie;
  return (
    <div className={`rounded-md bg-gray-700 py-4 w-${w ? w : 60}`}>
      <img
        onClick={() => {
          navigate(`watch/${key}`);
          dispatch(setWatvhing(movie));
        }}
        className={`w-[100%] h-40 bg-cover cursor-pointer bg-center`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      />
      <p>
        {title || original_title} | {overview.slice(0, 20)}...
      </p>
    </div>
  );
};

export default MovieCard;
