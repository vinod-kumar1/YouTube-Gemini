import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { privateKey } from "../../privateKeys";
import { useDispatch, useSelector } from "react-redux";
import { setWatching } from "../utils/videoStore";

const VideoPlayer = () => {
  let { yt_key } = useParams();
  let movies = useSelector((state) => state.videos.storedVideos);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let watching = useSelector((state) => state.videos.watchingVideo);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (!watching.title) {
      let id = searchParams.get("id");
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        privateKey.options
      )
        .then((res) => res.json())
        .then((json) => {
          console.log("wat", json.results[0]);
          dispatch(setWatching(json.results[0]));
        })
        .catch(console.log);
    }
  }, []);

  return (
    <div className="z-5 absolute w-screen flex overflow-auto gap-2 top-20 left-0 bg-gray-950 h-screen bg-gray-900]">
      <div className="w-[70%] h-[60%]">
        <iframe
          src={`https://www.youtube.com/embed/${yt_key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-[100%] h-[100%]"
        ></iframe>{" "}
        <div>
          <p className="font-mono">{watching.title}</p>
          <br />
          <p className="font-extralight">{watching.overview}</p>
        </div>
      </div>
      <div className="right-0 bg-gray-700 top-0">
        {movies.length &&
          movies.map((movie, i) => {
            return (
              <div
                onClick={() => {
                  navigate(`/watch/${movie.key}?id=${movie.id}`);
                  dispatch(setWatching(movie));
                }}
                key={movie.id + i}
                className=" mb-1 cursor-pointer flex"
              >
                <img
                  className="h-40 rounded-tr-md rounded-br-md"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                />
                <p className="ml-2 w-100 font-light">
                  {movie.title || movie.original_title} | <br />
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
