import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
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
  // console.log(coinId);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading.. Charts.."
      ) : (
        <ApexCharts
          type="line"
          // type="line"
          series={[
            {
              name: "test",
              data: [1, 2, 3, 4, 5, 6],
            },
            {
              name: "test2",
              data: [11, 12, 13, 14, 15, 16],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              height: 500,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
