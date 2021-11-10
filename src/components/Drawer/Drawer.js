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
import messageIcon from "../../assets/images/MenuIcons/message.png";
import libraryIcon from "../../assets/images/MenuIcons/library.png";
import settingsIcon from "../../assets/images/MenuIcons/settings.png";
import supportIcon from "../../assets/images/MenuIcons/support.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../Text/Text";
import { useRoute } from "@react-navigation/native";
import { RegularButton } from "../Buttons/RegularButton";
import { LogoutAction } from "../../Redux/actions/AuthActions/authActions";

export const Menu = ({ image, name, setselected, selected, style }) => (
  <TouchableOpacity
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderLeftWidth: selected ? 4 : 0,
      borderColor: primaryColor,
      marginTop: 30,
      paddingVertical: 5,
      ...style,
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
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);

  const Logout = () => dispatch(LogoutAction(navigation));

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            flex: 1,
            marginBottom: 20,
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
              style={{ marginTop: 20 }}
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
              selected={index === 3}
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
              selected={index === 5}
              setselected={() => navigation.navigate("Inventory")}
              image={inventoryIcon}
              name={"Inventory"}
            />
            <Menu
              selected={index === 6}
              setselected={() => navigation.navigate("Admin")}
              image={inventoryIcon}
              name={"Admin"}
            />

            <RegularButton
              text={"Logout"}
              onPress={Logout}
              textStyle={{ color: "red" }}
              colors={["white", "white"]}
              style={{
                borderColor: "red",
                borderWidth: 1,
                marginTop: 20,
                width: "90%",
                alignSelf: "center",
              }}
            />
          </View>

          <View style={{ width: "100%", marginTop: 40 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Help
            </Text>
            <Menu
              selected={index === 7}
              setselected={() => navigation.navigate("")}
              image={messageIcon}
              name={"Messages"}
              style={{ marginTop: 20 }}
            />
            <Menu
              selected={index === 8}
              setselected={() => navigation.navigate("")}
              image={libraryIcon}
              name={"Library"}
            />
            <Menu
              selected={index === 8}
              setselected={() => navigation.navigate("")}
              image={settingsIcon}
              name={"Settings"}
            />
            <Menu
              selected={index === 8}
              setselected={() => navigation.navigate("")}
              image={supportIcon}
              name={"Support"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
