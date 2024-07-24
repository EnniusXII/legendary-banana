import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import { Login } from "./pages/Login"
import { createBrowserRouter } from "react-router-dom";
import { SendTransactionPage } from "./pages/SendTransactionPage";
import { BlocksPage } from "./pages/BlocksPage";

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
      {
        path: "/sendtransaction",
        element: <SendTransactionPage />,
      },
      {
        path: "/blocks",
        element: <BlocksPage />,
      },
    ],
  },
]);
