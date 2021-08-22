import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoardingPage } from "./containers/screens/onBoardingPage";
import { SignUpPage } from "./containers/screens/SignUpPage";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Signup"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnBoardingPage" component={OnBoardingPage} />
        <Stack.Screen name="Signup" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Routes = () => <AuthRoutes />;
