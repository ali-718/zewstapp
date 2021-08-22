import React from "react";
import { Text as TextComponent } from "react-native";

export const Text = ({ style, ...props }) => {
  return (
    <TextComponent style={{ fontFamily: "openSans_regular", ...style }}>
      {props.children}
    </TextComponent>
  );
};
