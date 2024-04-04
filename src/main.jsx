import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, SignUp, AddPost, Post } from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.js";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={BrowserRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
