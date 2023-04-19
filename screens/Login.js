import React from "react";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  color: white;
`;
const Wrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;
const Btn = styled.TouchableOpacity``;
const BtnTxt = styled.Text`
  font-size: 16px;
  color: white;
`;

const Login = ({ navigation: { navigate } }) => (
  <Container>
    <Wrapper>
      <Text>
        Don't have an account ?{" "}
        <Btn onPress={() => navigate("Join")}>
          <BtnTxt>Join</BtnTxt>
        </Btn>
      </Text>
    </Wrapper>
  </Container>
);

export default Login;
