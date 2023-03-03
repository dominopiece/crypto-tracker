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

  // console.log(data?.map(price => Number(price.close)) as number[])
  return (
    <div>
      {isLoading ? (
        "Loading.. Charts.."
      ) : (
        <ApexCharts
          type="line"
          // type="line"
          series={[
            // {
            //   name: "test",
            //   data: [1, 2, 3, 4, 5, 6],
            // },
            // {
            //   name: "test2",
            //   data: [11, 12, 23, 14, 15, 16],
            // },
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 300,
              height: 500,
              toolbar: {
                show: false,
              },
              background: "trasparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime", 
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            fill: {
              // colors: ["red" ],
              // colors: ["#000408", "#B32824"],
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: ["white"],
                stops: [0, 100],
              },
            },
            // 소수점
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
            colors: ["pink"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
