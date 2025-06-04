import React, { createContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setStore } from "../utils/videoStore";
import { privateKey } from "../../privateKeys";
import MovieCard from "./MovieCard";
import { Outlet, useNavigate } from "react-router";

export let SidebarContext = createContext(null);

const Header = () => {
  let [sidebar, showSidebar] = useState(false);
  let movies = useSelector((state) => state.videos.storedVideos);
  let page = useSelector((state) => state.videos.page);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  console.log(movies);

  useEffect(() => {
    async function run() {
      try {
        let fetchAllMovies = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`,
          privateKey.options
        );
        let json = await fetchAllMovies.json();
        let fetchedMovies = json.results.map(
          ({ original_title, title, id, overview, poster_path }) => ({
            title,
            overview,
            poster_path,
            id,
            original_title,
          })
        );
        fetchedMovies = fetchedMovies.map(async (movie) => {
          let res = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
            privateKey.options
          );
          let json = await res.json();
          if (!("success" in json) && json?.results.length > 0) {
            let k = json.results[0].key;
            return { ...movie, key: k };
            // dispatch(setStore({ ...movie, key: k }));
          } else return "error";
        });
        console.log(fetchedMovies);
        let res = await Promise.all([...fetchedMovies]);
        dispatch(setStore(res));
      } catch (err) {
        console.log(err);
      }
    }
    run();
  }, [page]);

  return (
    <div className="text-white font-light bg-[#0f0f0f] w-screen h-[100%] container">
      <div className="sticky top-0 z-4 bg-black">
        <div className="absolute top-5">
          <button
            className="relative group cursor-pointer z-2"
            onClick={() => showSidebar((p) => !p)}
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
                <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>

                <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className="flex items-center top-1 relative justify-between h-20">
          <div className="flex items-center gap-1 relative left-20">
            <img
              src="https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144_v2.png
          "
              onClick={() => navigate("/")}
              alt="yt-logo"
              className="w-10 cursor-pointer"
            />
            <span className="yout font-light text-2xl text-white">
              YouTube <sup className="font-extralight">IN</sup>
            </span>
          </div>
          <div className="border-2 py-2 *:cursor-pointer border-gray-600 flex justify-between w-100 px-2 rounded-4xl">
            <input
              type="text"
              className="w-[100%] outline-0 px-2 text-gray-300 rounded-xl"
              placeholder="Search"
            />
            <button className="border-l-2 px-2 border-gray-300">🔎</button>
          </div>

          <img
            src="https://yt3.ggpht.com/yti/ANjgQV_KCdTqkS7bKkYIONaWT6byiaEmykdw3BNwOTeZjavRLNU=s88-c-k-c0x00ffffff-no-rj"
            alt="user-icon"
            className="rounded-4xl w-10"
          />
        </div>
        <Outlet />
        <Sidebar sidebar={sidebar} />
      </div>
    </div>
  );
};

export default Header;
