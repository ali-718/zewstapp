import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";
import { primaryColor, primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";

export const RegularButton = ({ text, style, textStyle, colors, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 5,
        backgroundColor: primaryColor,
        overflow: "hidden",
        ...style,
      }}
    >
      <LinearGradient
        colors={colors || [primaryColor, primaryShade1]}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "openSans_bold",
            ...textStyle,
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
