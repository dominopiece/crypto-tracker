import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Coin from "./Coin";
import Coins from "./Coins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":coinId",
        element: <Coin />,
      },
      {
        path: "coins",
        element: <Coins />,
      },
    ],
  },
]);

export default router;
