import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import { Login } from "./pages/Login"
import { createBrowserRouter } from "react-router-dom";

export const bananaRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
