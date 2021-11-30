import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import blackBackArrow from "../../assets/images/blackBackArrow.png";
import { Text } from "../Text/Text";

export const HeadingBox = ({ noBack, heading, onGoBack }) => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);

  return (
    <View
      style={{
        width: "90%",
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {!noBack && (
          <TouchableOpacity
            onPress={onGoBack ? onGoBack : () => navigation.goBack()}
          >
            <Image
              source={blackBackArrow}
              style={{ width: 20, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        )}

        {!!heading && (
          <Text
            style={{
              color: "black",
              fontSize: device === "tablet" ? 28 : 22,
              fontFamily: "openSans_semiBold",
              marginLeft: noBack ? 0 : 20,
            }}
          >
            {heading}
          </Text>
        )}
      </View>
    </View>
  );
};
