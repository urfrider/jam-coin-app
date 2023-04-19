const BASE_URL = "https://api.coinpaprika.com/v1";
const COINS_URL = BASE_URL + "/coins";

export const coins = () => fetch(COINS_URL).then((res) => res.json());
export const coinInfo = ({ queryKey }) =>
  fetch(`${COINS_URL}/${queryKey[1]}`).then((res) => res.json());
export const coinHistory = ({ queryKey }) =>
  fetch(
    `${BASE_URL}/tickers/${queryKey[1]}/historical?start=${
      new Date().toISOString().split("T")[0]
    }&interval=1h`
  ).then((res) => res.json());
