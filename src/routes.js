import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoardingPage } from "./containers/screens/AuthScreens/onBoardingPage";
import { SignUpPage } from "./containers/screens/AuthScreens/SignUpPage";
import { VerificationPage } from "./containers/screens/AuthScreens/Verificationpage";
import { LoginPage } from "./containers/screens/AuthScreens/LoginPage";
import { ForgotPassword } from "./containers/screens/AuthScreens/ForgotPassword";
import { TabRoutes } from "./TabRoutes";
import { FoodDetailPage } from "./containers/screens/MainScreens/MenuPages/FoodDetailPage";
import { AddMeal } from "./containers/screens/MainScreens/MenuPages/AddMeal";
import { OrderDetailPage } from "./containers/screens/MainScreens/HomePages/OrderDetailPage";
import { ResturantDetails } from "./containers/screens/MainScreens/AdminsPages/ResturantDetails";
import { ResturantLogo } from "./containers/screens/MainScreens/AdminsPages/ResturantLogo";
import { ProfilePage } from "./containers/screens/MainScreens/AdminsPages/ProfilePage";
import { ChangePasswordPage } from "./containers/screens/MainScreens/AdminsPages/ChangePassword";
import { BankDetailsPage } from "./containers/screens/MainScreens/AdminsPages/BankDetails";

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
        <Stack.Screen name="foodDetailPage" component={FoodDetailPage} />
        <Stack.Screen name="addMeal" component={AddMeal} />
        <Stack.Screen name="orderDetail" component={OrderDetailPage} />
        <Stack.Screen name="resturantDetail" component={ResturantDetails} />
        <Stack.Screen name="resturantLogo" component={ResturantLogo} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="changePass" component={ChangePasswordPage} />
        <Stack.Screen name="bankDetails" component={BankDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Routes = () => <MainRoutes />;
