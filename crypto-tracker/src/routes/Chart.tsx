import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface ICoinLocation {
  state: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { state } = useLocation() as ICoinLocation;
  // console.log(state);
  const coinId = state;
  console.log(coinId);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
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
