import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { primaryColor, primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";

export const Chip = ({ text, selected }) => {
  const device = useSelector((state) => state.system.device);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        borderColor: primaryShade1,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: selected ? primaryColor : "white",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color: selected ? "white" : primaryShade1,
          fontSize: 18,
          fontWeight: "bold",
          margin: 0,
          padding: 0,
        }}
      >
        {text || "Free"}
      </Text>
    </View>
  );
};
