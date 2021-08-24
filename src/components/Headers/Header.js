import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { primaryColor, primaryShade1 } from "../../theme/colors";

export const Header = ({
  leftImage,
  rightImage,
  heading,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <LinearGradient
      colors={[primaryColor, primaryShade1]}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onPressLeft}>
          <Image
            source={leftImage}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "openSans_semiBold",
            width: "80%",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {heading}
        </Text>

        <TouchableOpacity onPress={onPressRight}>
          {rightImage ? (
            <Image
              source={rightImage}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          ) : (
            <View style={{ width: 20 }} />
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
