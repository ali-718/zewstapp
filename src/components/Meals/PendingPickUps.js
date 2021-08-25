import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import shoppingBagIcon from "../../assets/images/shoppingBagIcon.png";
import { grayColor, grayTextColor } from "../../theme/colors";
import { Text } from "../Text/Text";

export const PendingPickUps = ({ orderNo, order, time, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        flexDirection: "row",
        borderColor: grayColor,
        paddingBottom: 10,
        borderBottomWidth: 1,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: "10%",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Image
          source={shoppingBagIcon}
          style={{ width: "90%", height: 25, resizeMode: "contain" }}
        />
      </View>
      <View style={{ width: "55%", justifyContent: "center", marginLeft: 5 }}>
        <Text
          style={{
            color: "black",
            fontFamily: "openSans_bold",
            fontSize: 16,
          }}
        >
          #{orderNo}
        </Text>
        <Text numberOfLines={1} style={{ color: grayTextColor, fontSize: 14 }}>
          {order}
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: grayTextColor, fontSize: 18 }}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};
