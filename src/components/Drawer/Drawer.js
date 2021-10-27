import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  drawerHeadingColor,
  grayMenuText,
  grayTextColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
  primaryShade3,
} from "../../theme/colors";
import overviewIcon from "../../assets/images/MenuIcons/overview.png";
import menuIcon from "../../assets/images/MenuIcons/menu.png";
import salesIcon from "../../assets/images/MenuIcons/sales.png";
import recipeIcon from "../../assets/images/MenuIcons/recipe.png";
import wasteIcon from "../../assets/images/MenuIcons/waste.png";
import inventoryIcon from "../../assets/images/MenuIcons/inventory.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text } from "../Text/Text";
import { useRoute } from "@react-navigation/native";

export const Menu = ({ image, name, setselected, selected, style }) => (
  <TouchableOpacity
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderLeftWidth: selected ? 4 : 0,
      borderColor: primaryColor,
      marginTop: 20,
      paddingVertical: 5,
    }}
    onPress={setselected}
  >
    <Image
      source={image}
      style={{
        width: 25,
        height: 25,
        resizeMode: "contain",
        marginLeft: 20,
        tintColor: selected ? primaryColor : grayTextColor,
      }}
    />
    <Text
      style={{
        fontSize: 18,
        color: selected ? primaryColor : grayMenuText,
        textAlign: "center",
        marginLeft: 20,
        fontFamily: "openSans_semiBold",
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

export const DrawerMenu = ({ state: { index } }) => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <View style={{ width: "100%", marginTop: 30 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Main
            </Text>
            <Menu
              selected={index === 0}
              setselected={() => navigation.navigate("Home")}
              image={overviewIcon}
              name={"Overview"}
            />
            <Menu
              selected={index === 1}
              setselected={() => navigation.navigate("Menu")}
              image={menuIcon}
              name={"Menu"}
            />
            <Menu
              selected={index === 2}
              setselected={() => navigation.navigate("Sales")}
              image={salesIcon}
              name={"Sales"}
            />
            <Menu
              selected={index === 3 || index === 11 || index === 12}
              setselected={() => navigation.navigate("Recipe")}
              image={recipeIcon}
              name={"Recipe Engineering"}
            />
            <Menu
              selected={index === 4}
              setselected={() => navigation.navigate("")}
              image={wasteIcon}
              name={"Waste Prediction"}
            />
            <Menu
              selected={index === 5 || index === 13 || index === 14}
              setselected={() => navigation.navigate("Inventory")}
              image={inventoryIcon}
              name={"Inventory"}
            />
            <Menu
              selected={
                index === 6 ||
                index === 15 ||
                index === 16 ||
                index === 17 ||
                index === 18 ||
                index === 19 ||
                index === 20 ||
                index === 21 ||
                index === 22 ||
                index === 23 ||
                index === 24
              }
              setselected={() => navigation.navigate("Admin")}
              image={inventoryIcon}
              name={"Admin"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
