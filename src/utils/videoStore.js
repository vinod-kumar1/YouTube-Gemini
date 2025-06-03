import { createSlice } from "@reduxjs/toolkit";

let videoStore = createSlice({
  name: "yt_video",
  initialState: {
    storedVideos: [],
    watchingVideo: {},
    page: 1,
  },
  reducers: {
    setStore: (state, action) => {
      state.storedVideos = [...state.storedVideos, action.payload];
    },
    setWatching: (state, action) => {
      state.watchingVideo = action.payload;
    },
    setPage: (state) => (state.page += 1),
  },
});

export default videoStore.reducer;
export let { setStore, setWatching } = videoStore.actions;
