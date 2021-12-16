import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { grayShade2, grayTextColor } from "../../theme/colors";

export const NoMealBox = ({ image, text }) => {
  const device = useSelector((state) => state.system.device);

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 300,
      }}
    >
      <Image
        source={image}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
      />

      <Text
        style={{
          color: grayTextColor,
          marginTop: 10,
          fontFamily: "openSans_semiBold",
          fontSize: device === "tablet" ? 20 : 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
