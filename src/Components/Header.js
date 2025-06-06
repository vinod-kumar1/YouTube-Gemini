import React, { createContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { emptyStore, setStore } from "../utils/videoStore";
import { privateKey } from "../../privateKeys";
import { privateKey } from "../../privateKeys";
import { Outlet, useNavigate } from "react-router";

export let SidebarContext = createContext(null);

const Header = () => {
  let [sidebar, showSidebar] = useState(false);
  let movies = useSelector((state) => state.videos.storedVideos);
  let page = useSelector((state) => state.videos.page);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [tempStore, setTempStore] = useState([]);
  let saerchInput = useRef("");
  console.log("page", page);

  useEffect(() => {
    console.log("tempS", tempStore);
    dispatch(setStore(tempStore));
  }, [tempStore]);

  async function searchVideos() {
    dispatch(emptyStore());
    navigate("/");
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${saerchInput.current.value}&include_adult=false&language=en-US&page=1`,
      privateKey.options
    )
      .then((res) => res.json())
      .then((json) => {
        json.results.forEach(({ title, original_title, id, overview }) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            privateKey.options
          )
            .then((ress) => ress.json())
            .then((jsonn) => {
              if (jsonn.results.length && Array.isArray(jsonn.results))
                setTempStore((p) => [
                  ...p,
                  {
                    title,
                    original_title,
                    id,
                    overview,
                    key: jsonn.results[0].key,
                  },
                ]);
              else setTempStore([]);
            })
            .catch(console.log);
        });
      })
      .catch(console.log);
  }

  console.log(movies);

  useEffect(() => {
    console.log("init");
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
          } else return "error";
        });
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
      <div className="sticky top-0 z-4 bg-black/50 backdrop-blur-md">
        <div className="absolute top-5 ">
          <button
            className="relative group left-2 cursor-pointer z-2"
            onClick={() => showSidebar((p) => !p)}
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                {/* Top Line */}
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left
          ${sidebar ? "translate-x-10" : ""}`}
                />

                {/* Middle Line */}
                <div
                  className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75
          ${sidebar ? "translate-x-10" : ""}`}
                />

                {/* Bottom Line */}
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150
          ${sidebar ? "translate-x-10" : ""}`}
                />

                {/* X Icon Overlay */}
                <div
                  className={`absolute items-center justify-between transform transition-all duration-500 top-2.5
          flex w-0 ${sidebar ? "translate-x-0 w-12" : "-translate-x-10 w-0"}`}
                >
                  <div
                    className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300
            ${sidebar ? "rotate-45" : "rotate-0"}`}
                  />
                  <div
                    className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300
            ${sidebar ? "-rotate-45" : "rotate-0"}`}
                  />
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
              onClick={() => {
                navigate("/");
              }}
              alt="yt-logo"
              className="w-10 cursor-pointer"
            />
            <span className="yout font-light ml-1 text-xl text-white">
              YouTube <sup className="font-extralight text-sm">IN</sup>
            </span>
          </div>
          <div className="border-2 py-2 *:cursor-pointer border-gray-600 flex justify-between w-100 px-2 rounded-4xl">
            <input
              type="text"
              ref={saerchInput}
              className="w-[100%] outline-0 px-2 text-gray-300 rounded-xl"
              placeholder="Search"
            />
            <button
              onClick={searchVideos}
              className="border-l-2 px-2 border-gray-300"
            >
              🔎
            </button>
          </div>

          <img
            src="https://yt3.ggpht.com/yti/ANjgQV_KCdTqkS7bKkYIONaWT6byiaEmykdw3BNwOTeZjavRLNU=s88-c-k-c0x00ffffff-no-rj"
            alt="user-icon"
            className="rounded-4xl w-10 relative right-2"
          />
        </div>
        <Sidebar sidebar={sidebar} />
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
