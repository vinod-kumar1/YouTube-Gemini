import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { setPage } from "../utils/videoStore";

const MovieContainer = () => {
  let movies = useSelector((state) => state.videos.storedVideos);
  let dispatch = useDispatch();

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(setPage());
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );
    if (movies.length > 0) {
      observer.observe(document.querySelector(".show-more"));
    }
    return () => observer.disconnect();
  }, [movies]);

  return (
    <div className="transition-all relative ease-in-out duration-2000 flex flex-wrap gap-2 justify-center movieContainer">
      {movies.length &&
        movies.map((movie, i) => {
          return (
            movie.poster_path && <MovieCard key={movie.id + i} movie={movie} />
          );
        })}
      <button className="show-more">Show More</button>
    </div>
  );
};

export default MovieContainer;
