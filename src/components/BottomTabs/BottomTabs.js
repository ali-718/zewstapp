import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  grayMenuText,
  grayTextColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
  primaryShade3,
} from "../../theme/colors";
import homeIcon from "../../assets/images/Dashboardicon.png";
import homeIconSelected from "../../assets/images/DashboardSelected.png";
import insightIcon from "../../assets/images/insightIcon.png";
import insightIconSelected from "../../assets/images/insightIconSelected.png";
import foodIcon from "../../assets/images/foodIcon.png";
import foodIconSelected from "../../assets/images/foodIconSelected.png";
import adminIcon from "../../assets/images/adminIcon.png";
import adminIconSelected from "../../assets/images/adminIconSelected.png";
import qrcodeIcon from "../../assets/images/qrcodeIcon.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RecipeIcon from "../../assets/images/RecipeIcon.png";
import RecipeIconSelected from "../../assets/images/RecipeIconSelected.png";
import WasteIcon from "../../assets/images/WasteIcon.png";
import InventorySelected from "../../assets/images/InventorySelected.png";
import InventoryIcon from "../../assets/images/InventoryIcon.png";
import MenuIcon from "../../assets/images/MenuIcon.png";

const Menu = ({ image, name, setselected, selected }) => (
  <TouchableOpacity
    style={{
      width: "11%",
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: selected ? 3 : 0,
      borderColor: primaryColor,
    }}
    onPress={setselected}
  >
    <Image
      source={image}
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    />
    <Text
      style={{
        fontSize: 10,
        color: grayMenuText,
        marginTop: 5,
        textAlign: "center",
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

export const BottomTabs = ({ selected, setselected }) => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const home = selected === 0 ? homeIconSelected : homeIcon;
  const insight = selected === 1 ? insightIconSelected : insightIcon;
  const qrcode = qrcodeIcon;
  const food = selected === 3 ? foodIconSelected : foodIcon;
  const admin = selected === 4 ? adminIconSelected : adminIcon;

  if (device === "tablet") {
    const RecipeEngineering = selected === 1 ? RecipeIconSelected : RecipeIcon;
    const WasteEngineering = selected === 2 ? WasteIcon : WasteIcon;
    const Inventory = selected === 3 ? InventorySelected : InventoryIcon;
    const food = selected === 5 ? foodIconSelected : foodIcon;
    const insight = selected === 6 ? insightIconSelected : insightIcon;
    const admin = selected === 7 ? adminIconSelected : adminIcon;

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          height: 65,
          backgroundColor: "white",
          borderTopWidth: 0.5,
          borderColor: grayTextColor,
        }}
      >
        <Menu
          selected={selected === 0}
          setselected={() => setselected(0)}
          image={home}
          name={"Dashboard"}
        />

        <Menu
          selected={selected === 1}
          setselected={() => setselected(1)}
          image={RecipeEngineering}
          name={"Recipe Engineering"}
        />

        <Menu
          selected={selected === 2}
          setselected={() => setselected(2)}
          image={WasteEngineering}
          name={"Waste Engineering"}
        />

        <Menu
          selected={selected === 3}
          setselected={() => setselected(3)}
          image={Inventory}
          name={"Inventory"}
        />

        <TouchableOpacity
          style={{
            width: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setselected(4);
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              overflow: "hidden",
              marginTop: -45,
            }}
          >
            <LinearGradient
              colors={[primaryColor, primaryShade1]}
              style={{
                width: 70,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: primaryShade1,
              }}
            >
              <Image
                source={qrcode}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
            </LinearGradient>
          </View>
          <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <Menu
          selected={selected === 5}
          setselected={() => setselected(5)}
          image={food}
          name={"Menu"}
        />

        <Menu
          selected={selected === 6}
          setselected={() => setselected(6)}
          image={insight}
          name={"Sales"}
        />

        <Menu
          selected={selected === 7}
          setselected={() => setselected(7)}
          image={admin}
          name={"Admin"}
        />

        <Menu setselected={() => null} image={MenuIcon} name={"More"} />
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        height: 65,
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderColor: grayTextColor,
      }}
    >
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: selected === 0 ? 3 : 0,
          borderColor: primaryColor,
        }}
        onPress={() => {
          setselected(0);
        }}
      >
        <Image
          source={home}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: selected === 1 ? 3 : 0,
          borderColor: primaryShade1,
        }}
        onPress={() => {
          setselected(1);
        }}
      >
        <Image
          source={insight}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Insights
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          setselected(2);
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            overflow: "hidden",
            marginTop: -45,
          }}
        >
          <LinearGradient
            colors={[primaryColor, primaryShade1]}
            style={{
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: primaryShade1,
            }}
          >
            <Image
              source={qrcode}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </LinearGradient>
        </View>
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Scan QR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: selected === 3 ? 3 : 0,
          borderColor: primaryShade1,
        }}
        onPress={() => {
          setselected(3);
        }}
      >
        <Image
          source={food}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Menu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: selected === 4 ? 3 : 0,
          borderColor: primaryShade1,
        }}
        onPress={() => {
          setselected(4);
        }}
      >
        <Image
          source={admin}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Admin
        </Text>
      </TouchableOpacity>
    </View>
  );
};
