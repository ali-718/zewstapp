import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./containers/screens/MainScreens/MenuPage";
import { View } from "react-native";
import { BottomTabs } from "./components/BottomTabs/BottomTabs";

const Stack = createNativeStackNavigator();

export const TabRoutes = () => {
  const [selected, setselected] = useState(0);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Home" component={MenuPage} />
      </Stack.Navigator>
      <BottomTabs selected={selected} setselected={(val) => setselected(val)} />
    </View>
  );
};
