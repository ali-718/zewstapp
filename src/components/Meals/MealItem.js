import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../Text/Text";

export const MealItem = ({
  label,
  text,
  icon,
  onIconClick,
  onPress,
  touchable,
  iconStyle,
}) => (
  <TouchableOpacity
    style={{
      width: "100%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      height: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
    activeOpacity={touchable ? 0.2 : 1}
    onPress={onPress}
  >
    <View style={{ flex: 0.9 }}>
      <Text style={{ color: "gray" }}>{label}</Text>

      <Text
        style={{
          marginTop: 5,
          color: "black",
          fontSize: 16,
          fontFamily: "openSans_semiBold",
        }}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>

    <TouchableOpacity onPress={onIconClick}>
      <Image
        source={icon}
        style={{ width: 60, height: 40, resizeMode: "contain", ...iconStyle }}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);
