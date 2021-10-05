import React from "react";
import { View } from "react-native";
import { HEIGHT } from "../../helpers/utlils";
import { RegularButton } from "../Buttons/RegularButton";
import { Text } from "../Text/Text";

export const RefetchDataError = ({ isLoading, onPress }) => {
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
      <Text style={{ fontSize: 20 }}>Unable to fetch data!</Text>
      <RegularButton
        isLoading={isLoading}
        onPress={onPress}
        text={"Retry"}
        style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
      />
    </View>
  );
};
