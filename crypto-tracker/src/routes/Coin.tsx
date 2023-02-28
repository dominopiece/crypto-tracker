import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

interface LocationState {
  state: string;
  // state: {
  //   name: string;
  //   rank: number;
  //   key: string;
  // };
}

function Coin() {
  // const { state } = useLocation() as LocationState;
  const { coinId } = useParams<{ coinId: string }>();
  //   console.log(coinId);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationState;
  // console.log(state);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // console.log(infoData)
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData)
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state || "secret mode or direct address"}</Title>
      </Header>
      {loading ? <Loader>Loading..</Loader> : <span>{info.id}</span>}
    </Container>
  );
}

export default Coin;
