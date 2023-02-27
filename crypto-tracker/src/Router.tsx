import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

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
