import React from "react";
import { Image, View, Text } from "react-native";
import { allergens, categories } from "../../helpers/utlils";

export const IconBox = ({ text, type }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* <Image
      source={
        type === "categories"
          ? categories.find((item) => item.name === text.toLowerCase())?.icon
          : type === "allergens"
          ? allergens.find((item) => item.name === text.toLowerCase())?.icon
          : ""
      }
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    /> */}
    <Text style={{ marginLeft: 10, fontSize: 16 }}>{text}</Text>
  </View>
);
