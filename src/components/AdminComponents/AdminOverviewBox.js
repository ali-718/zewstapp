import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { grayColor, grayTextColor, primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import forwardIcon from "../../assets/images/forwardIcon.png";
import { useSelector } from "react-redux";

export const AdminOverviewBox = ({
  label,
  name,
  rightText,
  image,
  iconStyle,
  onPress,
  recipe,
  onLongPress = () => null,
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        padding: device === "tablet" ? 20 : 10,
        borderRadius: 10,
        alignItems: "center",
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Image
        source={image}
        style={{
          width: device === "tablet" ? 40 : 30,
          height: device === "tablet" ? 40 : 30,
          resizeMode: "contain",
        }}
      />

      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Text
          style={
            recipe
              ? {
                  fontSize: device === "tablet" ? 30 : 20,
                  fontFamily: "openSans_bold",
                  color: "black",
                }
              : {
                  fontSize: device === "tablet" ? 20 : 16,
                  fontFamily: "openSans_bold",
                  color: "black",
                }
          }
        >
          {label}
        </Text>
        <Text
          numberOfLines={1}
          style={
            recipe
              ? {
                  fontSize: device === "tablet" ? 20 : 16,
                  fontFamily: "openSans_bold",
                  color: grayTextColor,
                }
              : {
                  fontSize: device === "tablet" ? 30 : 20,
                  fontFamily: "openSans_bold",
                  color: primaryColor,
                }
          }
        >
          {name}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: device === "tablet" ? 20 : 12,
          }}
        >
          {rightText}
        </Text>
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
