import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { primaryColor } from "../../theme/colors";

export const RoundButton = ({ text, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        ...style,
      }}
    >
      <Text
        style={{
          color: primaryColor,
          fontWeight: "bold",
          fontSize: 20,
          ...textStyle,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
