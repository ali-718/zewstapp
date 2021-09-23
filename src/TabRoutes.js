import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./containers/screens/MainScreens/MenuPages/MenuPage";
import { SafeAreaView, View } from "react-native";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
import { HomePage } from "./containers/screens/MainScreens/HomePages/HomePage";
import { InsightsPage } from "./containers/screens/MainScreens/InsightsPages/InsightsPage";
import { AdminPage } from "./containers/screens/MainScreens/AdminsPages/AdminPage";
import {
  getAllMeals,
  getMealAddons,
  getMealAllergens,
  getMealCategories,
} from "./Redux/actions/HomeActions/MealActions";
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export const TabRoutes = () => {
  const dispatch = useDispatch();
  const [selected, setselected] = useState(0);
  const device = useSelector((state) => state.system.device);

  useEffect(() => {
    Promise.all([
      dispatch(getMealCategories()),
      dispatch(getMealAddons()),
      dispatch(getMealAllergens()),
    ]);
  }, []);

  if (device === "tablet") {
    return (
      <SafeAreaView
        style={{ width: "100%", flex: 1, backgroundColor: "white" }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {selected === 0 && <Stack.Screen name="Home" component={HomePage} />}
          {selected === 1 && (
            <Stack.Screen name="Insights" component={InsightsPage} />
          )}
          {selected === 2 && <Stack.Screen name="Home" component={HomePage} />}
          {selected === 3 && <Stack.Screen name="Menu" component={MenuPage} />}
          {selected === 5 && <Stack.Screen name="Menu" component={MenuPage} />}
          {selected === 6 && (
            <Stack.Screen name="Insights" component={InsightsPage} />
          )}
          {selected === 7 && (
            <Stack.Screen name="Admin" component={AdminPage} />
          )}
        </Stack.Navigator>
        <BottomTabs
          selected={selected}
          setselected={(val) => setselected(val)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {selected === 0 && <Stack.Screen name="Home" component={HomePage} />}
        {selected === 1 && (
          <Stack.Screen name="Insights" component={InsightsPage} />
        )}
        {selected === 2 && <Stack.Screen name="Home" component={HomePage} />}
        {selected === 3 && <Stack.Screen name="Menu" component={MenuPage} />}
        {selected === 4 && <Stack.Screen name="Admin" component={AdminPage} />}
      </Stack.Navigator>
      <BottomTabs selected={selected} setselected={(val) => setselected(val)} />
    </SafeAreaView>
  );
};
