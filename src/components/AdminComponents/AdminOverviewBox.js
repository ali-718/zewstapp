import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import forwardIcon from "../../assets/images/forwardIcon.png";

export const AdminOverviewBox = ({
  label,
  name,
  rightText,
  image,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      />

      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Text
          style={{ fontSize: 16, fontFamily: "openSans_bold", color: "black" }}
        >
          {label}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 20,
            fontFamily: "openSans_bold",
            color: primaryColor,
          }}
        >
          {name}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ textTransform: "uppercase" }}>{rightText}</Text>
        <Image
          source={forwardIcon}
          style={{
            width: 20,
            height: 20,
            resizeMode: "contain",
            marginLeft: 5,
            ...iconStyle,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
