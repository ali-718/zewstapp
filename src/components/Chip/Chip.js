import React from "react";
import { View } from "react-native";
import { primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";

export const Chip = ({ text }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        borderColor: primaryShade1,
        borderWidth: 1,
        borderRadius: 50,
        height: 25,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: primaryShade1,
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        {text || "Free"}
      </Text>
    </View>
  );
};
