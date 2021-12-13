import { LinearGradient } from "expo-linear-gradient";
import { Spinner } from "native-base";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { primaryColor, primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";
import { FullPageLoadingModall } from "../FullPageLoadingModall/FullPageLoadingModall";

export const RegularButton = ({
  text,
  style,
  textStyle,
  colors,
  iconLeft,
  iconStyle,
  isLoading,
  disabled,
  noText,
  white,
  fullPageLoad,
  loadingLabel,
  ...props
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <>
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
          borderColor: primaryColor,
          borderWidth: white ? 1 : 0,
          ...style,
        }}
      >
        <LinearGradient
          colors={
            colors ||
            (white ? ["white", "white"] : [primaryColor, primaryColor])
          }
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
              <Spinner size="large" color={white ? primaryColor : "white"} />
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
              {!noText && (
                <Text
                  style={{
                    color: white ? primaryColor : "white",
                    fontWeight: "bold",
                    fontSize: device === "tablet" ? 16 : 12,
                    fontFamily: "openSans_bold",
                    marginLeft: iconLeft ? 10 : 0,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    ...textStyle,
                  }}
                >
                  {text}
                </Text>
              )}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
      {fullPageLoad && (
        <FullPageLoadingModall
          visible={isLoading}
          accessibilityLabel={loadingLabel}
          text={loadingLabel}
        />
      )}
    </>
  );
};
