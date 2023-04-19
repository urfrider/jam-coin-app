import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { CoinIcon } from "../components/Coin";
import { useQuery } from "react-query";
import { coinHistory, coinInfo } from "../api";
import { BLACK_COLOR } from "../colors";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    coinInfo
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    coinHistory
  );
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <CoinIcon
          source={{
            uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (historyData) {
      setGraphData(
        historyData.map((item) => ({
          x: new Date(item.timestamp).getTime(),
          y: item.price,
        }))
      );
    }
  }, [historyData]);
  console.log(graphData);

  return (
    <Container>
      {graphData && (
        <VictoryChart height={380}>
          <VictoryLine
            animate
            interpolation="cardinal"
            data={graphData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            data={graphData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      )}
    </Container>
  );
};

export default Detail;
