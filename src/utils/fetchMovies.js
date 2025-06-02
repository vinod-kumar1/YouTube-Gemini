export function fetchMovies(page) {
  return fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    options
  );
}
