import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid white;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    // padding a의 있을 경우 값만큼 클릭 가
    padding: 20px;
    /* // 박스 클릭 가능
    display: block; */
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     //  console.log(json)
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  // console.log(coins)

  // isLoading: boolean, data: json
  const { isLoading, data } = useQuery<ICoinInterface[]>(
    "allCoins",
    fetchCoins
  );
  // console.log(isLoading, data )
  return (
    <Container>
      <Helmet>
        <title>Coin List</title>
      </Helmet>
      <Header>
        <Title>Coin List</Title>
        <button>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* <Link to={`/${coin.id}`}> */}
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.rank}_{coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
