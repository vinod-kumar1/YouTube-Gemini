import { createSlice } from "@reduxjs/toolkit";

let videoStore = createSlice({
  name: "yt_video",
  initialState: {
    storedVideos: [],
    watchingVideo: {},
    page: 1,
    videoComments: [],
  },
  reducers: {
    setStore: (state, action) => {
      state.storedVideos.push(action.payload);
    },
    setWatching: (state, action) => {
      state.watchingVideo = action.payload;
    },
    setPage: (state) => (state.page += 1),
    setVideoComments: (state, action) => {
      state.videoComments.push(action.payload);
    },
  },
});

export default videoStore.reducer;
export let { setStore, setWatching, setVideoComments } = videoStore.actions;
