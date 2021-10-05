import { Spinner } from "native-base";
import React from "react";
import { View } from "react-native";
import { HEIGHT } from "../../helpers/utlils";
import { primaryColor } from "../../theme/colors";

export const LoadingPage = () => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: HEIGHT - 100,
      }}
    >
      <Spinner size={"large"} color={primaryColor} />
    </View>
  );
};
