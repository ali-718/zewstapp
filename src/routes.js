import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnBoardingPage } from "./containers/screens/AuthScreens/onBoardingPage";
import { SignUpPage } from "./containers/screens/AuthScreens/SignUpPage";
import { VerificationPage } from "./containers/screens/AuthScreens/Verificationpage";
import { LoginPage } from "./containers/screens/AuthScreens/LoginPage";
import { ForgotPassword } from "./containers/screens/AuthScreens/ForgotPassword";
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
import { AddInventoryPage } from "./containers/screens/MainScreens/InventoryPages/AddInventoryPage";
import { InventoryDetailPage } from "./containers/screens/MainScreens/InventoryPages/InventoryDetailPage";
import { LossInKitchen } from "./containers/screens/MainScreens/LossInKitchen/LossInKitchen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomePage } from "./containers/screens/MainScreens/HomePages/HomePage";
import { MenuPage } from "./containers/screens/MainScreens/MenuPages/MenuPage";
import { AdminPage } from "./containers/screens/MainScreens/AdminsPages/AdminPage";
import { RecipeListPage } from "./containers/screens/MainScreens/RecipePages/RecipeListPage";
import { InventoryListPage } from "./containers/screens/MainScreens/InventoryPages/InventoryListPage";
import { DrawerMenu, DrawerMenuWithoutNames } from "./components/Drawer/Drawer";
import { InsightsPage } from "./containers/screens/MainScreens/InsightsPages/InsightsPage";
import BankPage from "./containers/screens/MainScreens/AdminsPages/BankPage";
import { ResetPasswordVerification } from "./containers/screens/AuthScreens/ResetPasswordVerification";
import { VendorListPage } from "./containers/screens/MainScreens/VendorPages/VendorListPage";
import { AddVendorsPage } from "./containers/screens/MainScreens/VendorPages/AddVendorsPage";
import { TablesListScreen } from "./containers/screens/POSscreens/TablesListScreen";
import { OrderTakingScreen } from "./containers/screens/POSscreens/OrderTakingScreen";
import { StripePage } from "./containers/screens/MainScreens/AdminsPages/StripePage";
import { KitchenPage } from "./containers/screens/MainScreens/KitchenPages/KitchenPage";
import { Text } from "./components/Text/Text";
import { DailyFoodLogAdd } from "./containers/screens/MainScreens/DailyFoodLog/DailyFoodLogAdd";
import { WasteItemList } from "./containers/screens/MainScreens/WasteScreens/WasteItemList";
import { WasteDetailPage } from "./containers/screens/MainScreens/WasteScreens/WasteItemDetail";
import { WasteItemAddForUbf } from "./containers/screens/MainScreens/WasteScreens/WasteItemAddForUbf";
import { WasteItemAddForDiscount } from "./containers/screens/MainScreens/WasteScreens/WasteItemAddForDiscount";
import { UpdateInventoryPage } from "./containers/screens/MainScreens/InventoryPages/UpdateInventory";
import { EmployeeDetail } from "./containers/screens/MainScreens/AdminsPages/EmployeeDetail";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={"Verification"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SigningCheck" component={SigningCheck} />
        {/* <Stack.Screen name="OnBoardingPage" component={OnBoardingPage} /> */}
        <Stack.Screen name="Signup" component={SignUpPage} />
        <Stack.Screen name="Verification" component={VerificationPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen
          name="ResetPasswordVerification"
          component={ResetPasswordVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RecipeRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="recipeList" component={RecipeListPage} />
      <Stack.Screen name="recipeAdd" component={RecipeAdd} />
      <Stack.Screen name="recipeDetailPage" component={RecipeDetailPage} />
    </Stack.Navigator>
  );
};

const InventoryRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="inventoryList" component={InventoryListPage} />
      <Stack.Screen name="inventoryAdd" component={AddInventoryPage} />
      <Stack.Screen name="inventoryUpdate" component={UpdateInventoryPage} />
      <Stack.Screen name="inventoryDetail" component={InventoryDetailPage} />
    </Stack.Navigator>
  );
};

const VendorRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="vendorList" component={VendorListPage} />
      <Stack.Screen name="vendorAdd" component={AddVendorsPage} />
    </Stack.Navigator>
  );
};

const MenuRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="MenuPage" component={MenuPage} />
      <Stack.Screen name="foodDetailPage" component={FoodDetailPage} />
      <Stack.Screen name="addMeal" component={AddMeal} />
    </Stack.Navigator>
  );
};

const DashboardRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      <Stack.Screen name="lossInKitchen" component={LossInKitchen} />
      <Stack.Screen name="location" component={LocationsPage} />
      <Stack.Screen name="addLocation" component={AddLocationsPage} />
    </Stack.Navigator>
  );
};

const AdminRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="AdminPage" component={AdminPage} />
      <Stack.Screen name="resturantDetail" component={ResturantDetails} />
      <Stack.Screen name="resturantLogo" component={ResturantLogo} />
      <Stack.Screen name="profile" component={ProfilePage} />
      <Stack.Screen name="location" component={LocationsPage} />
      <Stack.Screen name="addLocation" component={AddLocationsPage} />
      <Stack.Screen name="tax" component={TaxPage} />
      <Stack.Screen name="taxDocument" component={TaxDocument} />
      <Stack.Screen name="employees" component={EmployeesPage} />
      <Stack.Screen name="addEmployees" component={AddEmployeesPage} />
      <Stack.Screen name="employeeDetail" component={EmployeeDetail} />
      <Stack.Screen name="bankPage" component={BankPage} />
      <Stack.Screen name="bankDetails" component={BankDetailsPage} />
      <Stack.Screen name="changePass" component={ChangePasswordPage} />
      <Stack.Screen name="stripe" component={StripePage} />
      <Stack.Screen
        name="ResetPasswordVerification"
        component={ResetPasswordVerification}
      />
    </Stack.Navigator>
  );
};

const OrderRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="tableList" component={TablesListScreen} />
      <Stack.Screen name="orderTaking" component={OrderTakingScreen} />
    </Stack.Navigator>
  );
};

const WasteRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="WasteList" component={WasteItemList} />
      <Stack.Screen name="WasteItemDetail" component={WasteDetailPage} />
      <Stack.Screen name="WasteItemAddForUbf" component={WasteItemAddForUbf} />
      <Stack.Screen
        name="WasteItemAddForDiscount"
        component={WasteItemAddForDiscount}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MainRoutes = () => {
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const isMenuSmall = useSelector((state) => state.system.isMenuSmall);
  const dispatch = useDispatch();

  return (
    <NavigationContainer
      onStateChange={(val) =>
        dispatch(actions.changeMenuIndex({ index: val.index }))
      }
    >
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType:
            device === "tablet"
              ? isMenuSmall
                ? "front"
                : // : orientation === "landscape"
                  // ? "permanent"
                  "front"
              : "front",
          gestureEnabled: false,
          swipeEnabled: true,
          drawerStyle: {
            width: 250,
          },
        }}
        drawerContent={(props) => <DrawerMenu {...props} />}
        backBehavior={"history"}
      >
        <Drawer.Screen name="Dashboard" component={DashboardRoutes} />
        <Drawer.Screen name="Menu" component={MenuRoutes} />
        <Drawer.Screen name="Sales" component={InsightsPage} />
        <Drawer.Screen name="Recipe" component={RecipeRoutes} />
        <Drawer.Screen name="WastePrediction" component={WasteRoutes} />
        <Drawer.Screen name="Inventory" component={InventoryRoutes} />
        <Drawer.Screen name="Admin" component={AdminRoutes} />
        <Drawer.Screen name="Vendor" component={VendorRoutes} />
        <Drawer.Screen name="Pos" component={OrderRoutes} />
        <Drawer.Screen name="Kitchen" component={KitchenPage} />
        <Stack.Screen name="DailyFoodLog" component={DailyFoodLogAdd} />

        <Drawer.Screen name="Messages" component={AdminPage} />
        <Drawer.Screen name="Library" component={AdminPage} />
        <Drawer.Screen name="Settings" component={AdminPage} />
        <Drawer.Screen name="Support" component={AdminPage} />

        <Stack.Screen name="orderDetail" component={OrderDetailPage} />
      </Drawer.Navigator>
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

    if (width > 768) {
      dispatch(actions.deviceType({ type: TABLET }));
      return;
    }

    dispatch(actions.deviceType({ type: MOBILE }));
  }, []);

  if (user?.token) {
    return <MainRoutes />;
  }
  return <AuthRoutes />;
};
