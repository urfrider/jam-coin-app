import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { ActivityIndicator, FlatList, View } from "react-native";
import { BLACK_COLOR } from "../colors";
import Coin from "../components/Coin";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;
const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;

const Home = () => {
  const { isLoading, data } = useQuery("coins", coins);
  const [cleanedData, setCleanedData] = useState([]);
  useEffect(() => {
    setCleanedData(
      data?.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
    );
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        data={cleanedData}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin symbol={item.symbol} id={item.id} index={index} />
        )}
      />
    </Container>
  );
};

export default Home;
