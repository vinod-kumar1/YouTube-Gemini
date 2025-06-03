import { useEffect, useState } from "react";
import { privateKey } from "../../privateKeys";

export function fetchMovies(page) {
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    let temp = [];
    if (movies.length) {
      movies.forEach((movie) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`
        )
          .then((res) => res.json())
          .then((json) => temp.push(json.results[0].key))
          .catch((err) => {
            return err;
          });
      });
    }
  }, [movies]);

  return fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`,
    privateKey.options
  )
    .then((res) => res.json())
    .then((json) => setMovies(json.results))
    .catch((err) => {
      return err;
    });
}
