import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Alert } from "react-native";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitEmail = () => {
    passwordInput.current.focus();
  };
  const onSubmitPassword = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      return Alert.alert("Please fill in the form");
    }
    if (loading) return;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
      setLoading(false);
    } catch (e) {
      switch (e.code) {
        case "auth/weak-password": {
          Alert.alert("Input a stronger password!");
        }
      }
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmail}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPassword}
      />
      <Btn onPress={onSubmitPassword}>
        {loading ? <ActivityIndicator /> : <BtnText>Create Account</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;
