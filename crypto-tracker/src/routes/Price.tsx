import { useLocation } from "react-router-dom";
interface ICoinLocation {
  state: string;
}

function Price() {
  const { state } = useLocation() as ICoinLocation;
  console.log(state);
  return <h1>Price</h1>;
}

export default Price;
