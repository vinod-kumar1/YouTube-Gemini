import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

let videoStore = createSlice({
  name: "yt_video",
  initialState: {
    storedVideos: [],
    watchingVideo: {},
    page: 0,
    videoComments: [],
  },
  reducers: {
    setStore: (state, action) => {
      let res = action.payload
        .filter((item) => item != "error")
        .map((item) => ({ ...item, uid: Date.now() + v4() }));
      state.storedVideos.push(...res);
    },
    emptyStore: (state, action) => {
      state.storedVideos = [];
    },
    setWatching: (state, action) => {
      state.watchingVideo = action.payload;
    },
    setPage: (state) => {
      state.page += 1;
    },
    setVideoComments: (state, action) => {
      state.videoComments.push(action.payload);
    },
  },
});

export default videoStore.reducer;
export let { setStore, setWatching, emptyStore, setVideoComments, setPage } =
  videoStore.actions;
