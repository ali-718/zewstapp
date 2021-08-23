import React from "react";
import { Text as TextComponent } from "react-native";

export const Text = ({ style, ...props }) => {
  return (
    <TextComponent
      {...props}
      style={{ fontFamily: "openSans_regular", ...style }}
    >
      {props.children}
    </TextComponent>
  );
};
