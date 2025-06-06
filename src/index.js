import ReactDom from "react-dom/client";
import "./styles.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  HashRouter,
} from "react-router";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import VideoPlayer from "./Components/VideoPlayer";
import appStore from "./utils/appStore";
import MovieContainer from "./Components/MovieContainer";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    children: [
      {
        index: true,
        Component: MovieContainer,
      },
      {
        path: "watch/:yt_key",
        Component: VideoPlayer,
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
