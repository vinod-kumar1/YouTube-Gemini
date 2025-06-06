import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { privateKey } from "../../privateKeys";
import { useDispatch, useSelector } from "react-redux";
import { setWatching } from "../utils/videoStore";
import CommentsSection from "./CommentsSection";

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
          dispatch(setWatching(json));
        })
        .catch(console.log);
    }
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="z-5 w-screen flex flex-col overflow-auto gap-2 top-20 left-0 bg-gray-950 h-screen bg-gray-900]">
      <div className="flex">
        <div className="w-[70%] h-[20%]">
          <iframe
            src={`https://www.youtube.com/embed/${yt_key}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[100%] z-20 h-[100%]"
          ></iframe>{" "}
          <div className="relative left-2 font-bold">
            <p className="font-mono relative left-2 hover:underline">
              {watching.title}
            </p>
            <br />
            <p className="font-extralight">{watching.overview}</p>
          </div>
        </div>
        <div className="right-0  top-0">
          {movies.length &&
            movies.map((movie, i) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/watch/${movie.key}?id=${movie.id}`);
                    dispatch(setWatching(movie));
                  }}
                  key={movie.uid}
                  className=" mb-1 cursor-pointer flex"
                >
                  <img
                    className="h-40 rounded-tr-md rounded-br-md"
                    src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                    alt=""
                  />
                  <p className="ml-2 w-100 font-light">
                    {movie.title || movie.original_title} | <br />
                    {movie.overview?.slice(0, 40)}...
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <CommentsSection videoKey={yt_key} />
    </div>
  );
};

export default VideoPlayer;
