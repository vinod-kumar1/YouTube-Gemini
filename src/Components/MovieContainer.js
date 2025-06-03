import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MovieContainer = () => {
  let movies = useSelector((state) => state.videos.storedVideos);
  return (
    <div className="transition-all relative left-10 ease-in-out duration-2000 flex flex-wrap gap-2 justify-center overflow-auto mx-auto movieContainer">
      {movies.length &&
        movies.map((movie) => {
          return (
            movie.poster_path && <MovieCard key={movie.id} movie={movie} />
          );
        })}
    </div>
  );
};

export default MovieContainer;
