import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from "native-base";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { primaryColor, primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";

export const RegularButton = ({
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
  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading || disabled}
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
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {iconLeft ? (
              <Image style={{ ...iconStyle }} source={iconLeft} />
            ) : null}
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "openSans_bold",
                marginLeft: iconLeft ? 10 : 0,
                ...textStyle,
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
