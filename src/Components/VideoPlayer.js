import React from "react";
import { useParams } from "react-router";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const VideoPlayer = () => {
  let { yt_key } = useParams();
  let movies = useSelector((state) => state.videos.storedVideos);
  console.log("kl", yt_key);

  return (
    <div className="z-5 absolute w-screen flex overflow-auto cursor-pointer gap-2 top-20 left-0 bg-gray-950 h-screen bg-gray-900]">
      <div className="w-[70%] h-[60%]">
        <iframe
          src={`https://www.youtube.com/embed/${yt_key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-[100%] h-[100%]"
        ></iframe>{" "}
        <div>{}</div>
      </div>
      <div className="right-0 top-0">
        {movies.length &&
          movies.map((movie, i) => {
            return (
              <div
                onClick={() => {}}
                key={movie.id + i}
                className="ml-1 rounded-md flex"
              >
                <img
                  className="h-40"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                />
                <p className="ml-2 w-100">
                  {movie.title || movie.original_title} |{" "}
                  {movie.overview.slice(0, 40)}...
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VideoPlayer;
