import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  margin: 10px;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  align-items: center;
`;
export const CoinIcon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;
const CoinSymbol = styled.Text`
  color: white;
`;

const Coin = ({ symbol, index, id }) => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate("Detail", { symbol, id })}
    >
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        <CoinIcon
          source={{
            uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
        <CoinSymbol>{symbol}</CoinSymbol>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Coin;
