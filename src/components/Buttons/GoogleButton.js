import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from "native-base";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  googleButtonColor,
  primaryColor,
  primaryShade1,
} from "../../theme/colors";
import { Text } from "../Text/Text";
import googleIcon from "../../assets/images/googleIcon.png";

export const GoogleButton = ({
  text,
  style,
  textStyle,
  colors,
  iconLeft,
  iconStyle,
  isLoading,
  disabled,
  ...props
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading || disabled}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: device === "tablet" ? 60 : 50,
        borderRadius: 5,
        backgroundColor: primaryColor,
        overflow: "hidden",
        ...style,
      }}
    >
      <LinearGradient
        colors={[googleButtonColor, googleButtonColor]}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {isLoading ? (
          <>
            <Spinner size="large" color={"white"} />
          </>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <Image style={{ ...iconStyle }} source={googleIcon} />

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: device === "tablet" ? 18 : 14,
                fontFamily: "openSans_bold",
                marginLeft: iconLeft ? 10 : 0,
                letterSpacing: 1,
                flex: 1,
                textAlign: "center",
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
