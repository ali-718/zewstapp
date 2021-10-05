import React, { useEffect } from "react";
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
import { LocationsPage } from "./containers/screens/MainScreens/AdminsPages/LocationsPage";
import { AddLocationsPage } from "./containers/screens/MainScreens/AdminsPages/AddLocationsPage";
import { TaxPage } from "./containers/screens/MainScreens/AdminsPages/TaxPage";
import { TaxDocument } from "./containers/screens/MainScreens/AdminsPages/TaxDocument";
import { EmployeesPage } from "./containers/screens/MainScreens/AdminsPages/EmployeesPage";
import { AddEmployeesPage } from "./containers/screens/MainScreens/AdminsPages/AddEmployeesPage";
import { SigningCheck } from "./containers/screens/AuthScreens/SigningCheck";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./Redux/actions/SystemActions/SystemActions";
import * as Device from "expo-device";
import {
  LANDSCAPE,
  MOBILE,
  PORTRAIT,
  TABLET,
} from "./Redux/actions/SystemActions/Types";
import { Dimensions } from "react-native";
import { RecipeDetailPage } from "./containers/screens/MainScreens/RecipePages/RecipeDetailPage";
import { RecipeAdd } from "./containers/screens/MainScreens/RecipePages/RecipeAdd";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SigningCheck" component={SigningCheck} />
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabRoutes" component={TabRoutes} />
        <Stack.Screen name="foodDetailPage" component={FoodDetailPage} />
        <Stack.Screen name="addMeal" component={AddMeal} />
        <Stack.Screen name="orderDetail" component={OrderDetailPage} />
        <Stack.Screen name="resturantDetail" component={ResturantDetails} />
        <Stack.Screen name="resturantLogo" component={ResturantLogo} />
        <Stack.Screen name="profile" component={ProfilePage} />
        <Stack.Screen name="changePass" component={ChangePasswordPage} />
        <Stack.Screen name="bankDetails" component={BankDetailsPage} />
        <Stack.Screen name="location" component={LocationsPage} />
        <Stack.Screen name="addLocation" component={AddLocationsPage} />
        <Stack.Screen name="tax" component={TaxPage} />
        <Stack.Screen name="taxDocument" component={TaxDocument} />
        <Stack.Screen name="employees" component={EmployeesPage} />
        <Stack.Screen name="addEmployees" component={AddEmployeesPage} />
        <Stack.Screen name="recipeDetailPage" component={RecipeDetailPage} />
        <Stack.Screen name="recipeAdd" component={RecipeAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const Routes = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const setOrientation = (widht, height) => {
    if (widht > height) {
      dispatch(actions.changeOrientationAction({ type: LANDSCAPE }));
    } else {
      dispatch(actions.changeOrientationAction({ type: PORTRAIT }));
    }
  };

  useEffect(() => {
    const ipad = Device.modelName.includes("iPad");
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    setOrientation(width, height);

    Dimensions.addEventListener("change", (e) => {
      if (ipad) {
        setOrientation(e.screen.width, e.screen.height);

        return;
      }
      dispatch(actions.changeOrientationAction({ type: PORTRAIT }));
    });

    if (Platform.OS === "ios") {
      if (ipad) {
        dispatch(actions.deviceType({ type: TABLET }));
      } else {
        dispatch(actions.deviceType({ type: MOBILE }));
      }
      return;
    }

    dispatch(actions.deviceType({ type: MOBILE }));
  }, []);

  if (user?.token) {
    return <MainRoutes />;
  }
  return <AuthRoutes />;
};
