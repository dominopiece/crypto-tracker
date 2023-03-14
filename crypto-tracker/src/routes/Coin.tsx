import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  // 화면 크게 했을 때도, 모바일 화면 처럼 가운데 위치
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 15px;
  font-size: 20px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
`;

const Decription = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 10px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    transition: color 0.5s ease-in;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

interface ILocationState {
  state: string;
  // state: {
  //   name: string;
  //   rank: number;
  //   key: string;
  // };
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface Iteam {
  id: string;
  name: string;
  position: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: Iteam[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

// export interface IRouterProps {
//   toggleDark: () => void;
//   isDark: boolean;
//   setIsDark: Dispatch<SetStateAction<boolean>>
// }

interface isDark {
  isDark?: boolean;
  setIsDark?: Dispatch<SetStateAction<boolean>>;
}

interface IRouterProps {
  toggleDark: () => void;
  // isDark?: boolean;
  // setIsDark: Dispatch<SetStateAction<boolean>>;
  isDarkSet: isDark[];
}

function Coin() {
  // const { state } = useLocation() as ILocationState;
  const { coinId } = useParams<{ coinId: string }>();
  //   console.log(coinId);
  // const [loading, setLoading] = useState(true);
  const { state } = useLocation() as ILocationState;
  // console.log(state);
  // useMatch: 지정된 주소가 있으면 Object 없으면 null
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  // console.log(chartMatch);
  // console.log(priceMatch);
  // // api useQueris
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(String(coinId))
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceInfo>(
    ["tickers", coinId],
    () => fetchCoinTickers(String(coinId)),
    {
      //0.5 초
      refetchInterval: 5000,
    }
  );
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceInfo>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     // console.log(infoData);
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     // console.log(priceData);
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const loading = infoLoading && tickersLoading;

  const {
    isDarkSet: [isDark, setIsDark],
  } = useOutletContext<IRouterProps>();

  return (
    <Container>
      <Helmet>
        <title>{state ? state : loading ? "Loading.." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>
          {/* 시크릿 모드에서 접속 시 아래 문구  */}
          {/* {state || "secret mode or direct address"} */}
          {state ? state : loading ? "Loading.." : infoData?.name}
        </Title>
      </Header>
      {loading ? <Loader>Loading..</Loader> : <span>{infoData?.id}</span>}
      {loading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <OverView>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </OverView>
          <Decription>{infoData?.description}</Decription>
          <OverView>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply: </span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price USD: </span>
              <span>${tickersData?.quotes.USD.price.toFixed(4)}</span>
              {/* <span>${tickersData?.quotes.USD.price}</span> */}
            </OverviewItem>
          </OverView>
          {/* tab */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              {/* <Link to={`/${coinId}/chart`} state={{coinId:coinId, isDark:isDark}}> */}
              <Link to={`/${coinId}/chart`} state={coinId}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} state={coinId}>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;
