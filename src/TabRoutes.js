import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuPage } from "./containers/screens/MainScreens/MenuPages/MenuPage";
import { SafeAreaView, View } from "react-native";
import { BottomTabs, Menu } from "./components/BottomTabs/BottomTabs";
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
import { InventoryListPage } from "./containers/screens/MainScreens/InventoryPages/InventoryListPage";
import adminIcon from "./assets/images/adminIcon.png";
import adminIconSelected from "./assets/images/adminIconSelected.png";
import RecipeIcon from "./assets/images/RecipeIcon.png";
import RecipeIconSelected from "./assets/images/RecipeIconSelected.png";
import WasteIcon from "./assets/images/WasteIcon.png";
import InventorySelected from "./assets/images/InventorySelected.png";
import InventoryIcon from "./assets/images/InventoryIcon.png";

const Stack = createNativeStackNavigator();

export const TabRoutes = () => {
  const dispatch = useDispatch();
  const [selected, setselected] = useState(0);
  const [showMore, setshowmore] = useState(false);
  const user = useSelector((state) => state.auth.user.user);

  const RecipeEngineering = selected === 5 ? RecipeIconSelected : RecipeIcon;
  const WasteEngineering = selected === 6 ? WasteIcon : WasteIcon;
  const Inventory = selected === 7 ? InventorySelected : InventoryIcon;
  const admin = selected === 10 ? adminIconSelected : adminIcon;

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
        {selected === 7 && (
          <Stack.Screen name="Inventory" component={InventoryListPage} />
        )}
        {(selected === 6 || selected === 8 || selected === 4) && (
          <Stack.Screen name="Recipe" component={() => <View />} />
        )}
      </Stack.Navigator>
      <BottomTabs
        showMore={showMore}
        setshowmore={setshowmore}
        selected={selected}
        setselected={(val) => setselected(val)}
      />

      {showMore && (
        <View
          style={{
            width: 80,
            position: "absolute",
            right: 10,
            zIndex: 2,
            backgroundColor: "white",
            bottom: 80,
            borderRadius: 10,
            paddingVertical: 20,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            zIndex: 999999999,
            elevation: 6,
          }}
        >
          <Menu
            selected={selected === 5}
            setselected={() => setselected(5)}
            image={RecipeEngineering}
            name={"Recipe Engineering"}
            style={{ width: "90%", paddingTop: 10 }}
          />

          <Menu
            selected={selected === 6}
            setselected={() => setselected(6)}
            image={WasteEngineering}
            name={"Waste Engineering"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />

          <Menu
            selected={selected === 7}
            setselected={() => setselected(7)}
            image={Inventory}
            name={"Inventory"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />

          <Menu
            selected={selected === 10}
            setselected={() => setselected(10)}
            image={admin}
            name={"Admin"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
