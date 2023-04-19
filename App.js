import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./navigators/AuthNav";
import UnauthNav from "./navigators/UnauthNav";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isAuthenticated ? <AuthNav /> : <UnauthNav />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
