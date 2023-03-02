import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ICoinLocation {
  state: string;
}

function Chart() {
  const { state } = useLocation() as ICoinLocation;
  // console.log(state);
  const coinId = state;
  console.log(coinId);
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      <h1>Chart</h1>
      <h2>{state}</h2>
      <h2>{coinId}</h2>
    </>
  );
}

export default Chart;
