import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import { BLACK_COLOR } from "../colors";
import Detail from "../screens/Detail";

const Nav = createNativeStackNavigator();

const AuthNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: BLACK_COLOR,
      },
      headerTitleAlign: "center",
    }}
  >
    <Nav.Screen name="Home" component={Home} />
    <Nav.Screen name="Detail" component={Detail} />
  </Nav.Navigator>
);

export default AuthNav;
