import React from "react";
import { View, Text, Image } from "react-native";
import { grayShade2, grayTextColor } from "../../theme/colors";

export const NoMealBox = ({ image, text }) => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: grayShade2,
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
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
