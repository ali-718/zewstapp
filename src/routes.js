import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoardingPage } from "./containers/screens/AuthScreens/onBoardingPage";
import { SignUpPage } from "./containers/screens/AuthScreens/SignUpPage";
import { VerificationPage } from "./containers/screens/AuthScreens/Verificationpage";
import { LoginPage } from "./containers/screens/AuthScreens/LoginPage";
import { ForgotPassword } from "./containers/screens/AuthScreens/ForgotPassword";
import { View } from "react-native";
import { MenuPage } from "./containers/screens/MainScreens/MenuPage";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
import { TabRoutes } from "./TabRoutes";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingPage" component={OnBoardingPage} />
        <Stack.Screen name="Signup" component={SignUpPage} />
        <Stack.Screen name="Verification" component={VerificationPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"test"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="test" component={TabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Routes = () => <MainRoutes />;
