import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { primaryColor, primaryShade1 } from "../../theme/colors";

export const Header = ({
  leftImage,
  rightImage,
  heading,
  onPressLeft,
  onPressRight,
}) => {
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);

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
          padding: device === "tablet" ? 25 : 15,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onPressLeft}>
          <Image
            source={leftImage}
            style={{
              width: device === "tablet" ? 30 : 20,
              height: device === "tablet" ? 30 : 20,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            fontSize: device === "tablet" ? 25 : 20,
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
              style={{
                width: device === "tablet" ? 30 : 20,
                height: device === "tablet" ? 30 : 20,
                resizeMode: "contain",
              }}
            />
          ) : (
            <View style={{ width: 20 }} />
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
