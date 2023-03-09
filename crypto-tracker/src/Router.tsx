import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

interface IRouterProps {
  toggleDark: () => void
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
      {
        path: "coins",
        element: <Coins  />,
      },
    ],
  },
]);

export default router;
