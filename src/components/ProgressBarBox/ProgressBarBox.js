import { Progress } from "native-base";
import React from "react";
import { View } from "react-native";
import { grayColor, primaryShade1 } from "../../theme/colors";
import { Text } from "../Text/Text";

export const ProgressBarBox = ({
  leftTextTop,
  leftTextBottom,
  rightText,
  progressValue,
  leftProgressText,
  rightProgressText,
}) => {
  return (
    <View
      style={{
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontFamily: "openSans_bold" }}>
            {leftTextTop}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "openSans_bold" }}>
            {leftTextBottom}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color: primaryShade1,
              fontFamily: "openSans_bold",
            }}
          >
            {rightText}
          </Text>
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 20 }}>
        <Progress colorScheme={"app"} bg={grayColor} value={progressValue} />
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 14 }}>{leftProgressText}</Text>
        <Text style={{ fontSize: 14 }}>{rightProgressText}</Text>
      </View>
    </View>
  );
};
