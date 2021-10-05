import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./containers/screens/MainScreens/MenuPages/MenuPage";
import { SafeAreaView, View } from "react-native";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
import { HomePage } from "./containers/screens/MainScreens/HomePages/HomePage";
import { InsightsPage } from "./containers/screens/MainScreens/InsightsPages/InsightsPage";
import { AdminPage } from "./containers/screens/MainScreens/AdminsPages/AdminPage";
import {
  getMealAddons,
  getMealAllergens,
  getMealCategories,
} from "./Redux/actions/HomeActions/MealActions";
import { useDispatch, useSelector } from "react-redux";
import { RecipeListPage } from "./containers/screens/MainScreens/RecipePages/RecipeListPage";
import { getAllUserLocations } from "./Redux/actions/AdminActions/LocationActions";
import { getAllEmployees } from "./Redux/actions/EmployeeActions/EmployeeActions";

const Stack = createNativeStackNavigator();

export const TabRoutes = () => {
  const dispatch = useDispatch();
  const [selected, setselected] = useState(0);
  const user = useSelector((state) => state.auth.user.user);

  useEffect(() => {
    Promise.all([
      dispatch(getMealCategories()),
      dispatch(getMealAddons()),
      dispatch(getMealAllergens()),
      dispatch(getAllUserLocations({ userId: user.clientId })),
      dispatch(getAllEmployees({ clientId: user.clientId })),
    ]);
  }, []);

  return (
    <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {selected === 0 && <Stack.Screen name="Home" component={HomePage} />}
        {(selected === 1 || selected === 9) && (
          <Stack.Screen name="Insights" component={InsightsPage} />
        )}
        {selected === 2 && <Stack.Screen name="Home" component={HomePage} />}
        {(selected === 3 || selected === 8) && (
          <Stack.Screen name="Menu" component={MenuPage} />
        )}
        {selected === 10 && <Stack.Screen name="Admin" component={AdminPage} />}
        {selected === 5 && (
          <Stack.Screen name="Recipe" component={RecipeListPage} />
        )}
        {(selected === 6 ||
          selected === 7 ||
          selected === 8 ||
          selected === 4) && (
          <Stack.Screen name="Recipe" component={() => <View />} />
        )}
      </Stack.Navigator>
      <BottomTabs selected={selected} setselected={(val) => setselected(val)} />
    </SafeAreaView>
  );
};
