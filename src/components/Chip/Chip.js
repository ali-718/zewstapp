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
        paddingHorizontal: 10,
        borderColor: primaryShade1,
        borderWidth: 1,
        borderRadius: 50,
        height: device === "tablet" ? 45 : 25,
        backgroundColor: selected ? primaryColor : "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: selected ? "white" : primaryShade1,
          fontSize: device === "tablet" ? 18 : 14,
          fontWeight: "bold",
        }}
      >
        {text || "Free"}
      </Text>
    </View>
  );
};
