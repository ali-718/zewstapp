import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./containers/screens/MainScreens/MenuPages/MenuPage";
import { SafeAreaView, View } from "react-native";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";
import { HomePage } from "./containers/screens/MainScreens/HomePages/HomePage";
import { InsightsPage } from "./containers/screens/MainScreens/InsightsPages/InsightsPage";

const Stack = createNativeStackNavigator();

export const TabRoutes = () => {
  const [selected, setselected] = useState(0);

  return (
    <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Insights" component={InsightsPage} />
      </Stack.Navigator>
      <BottomTabs selected={selected} setselected={(val) => setselected(val)} />
    </SafeAreaView>
  );
};
