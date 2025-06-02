import { configureStore } from "@reduxjs/toolkit";
import videoStore from "./videoStore";

let appStore = configureStore({
  reducer: {
    videos: videoStore,
  },
});
export default appStore;
