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
import homeIcon from "../../assets/images/homeIcon.png";
import homeIconSelected from "../../assets/images/homeIconSelected.png";
import insightIcon from "../../assets/images/insightIcon.png";
import insightIconSelected from "../../assets/images/insightIconSelected.png";
import foodIcon from "../../assets/images/foodIcon.png";
import foodIconSelected from "../../assets/images/foodIconSelected.png";
import adminIcon from "../../assets/images/adminIcon.png";
import adminIconSelected from "../../assets/images/adminIconSelected.png";
import qrcodeIcon from "../../assets/images/qrcodeIcon.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export const BottomTabs = ({ selected, setselected }) => {
  const navigation = useNavigation();
  const home = selected === 0 ? homeIconSelected : homeIcon;
  const insight = selected === 1 ? insightIconSelected : insightIcon;
  const qrcode = qrcodeIcon;
  const food = selected === 3 ? foodIconSelected : foodIcon;
  const admin = selected === 4 ? adminIconSelected : adminIcon;

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
          navigation.navigate("Home");
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
          navigation.navigate("Insights");
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
          navigation.navigate("QR");
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
          navigation.navigate("Menu");
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
          navigation.navigate("Admin");
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
