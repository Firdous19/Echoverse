import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  AddPost,
  Post,
  EditPost,
  AllPosts,
} from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthLayout } from "./components";

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
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts/post/:id",
        element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        ),
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
