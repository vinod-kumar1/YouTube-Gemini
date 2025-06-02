import ReactDom from "react-dom/client";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Header,
    children: [
      {
        path: "/watch?v=:yt_key",
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
