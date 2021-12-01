import React from "react";
import { View } from "react-native";
import { kitchenMenuColor } from "../../theme/colors";
import { Text } from "../Text/Text";

export const SpikeOrder = () => {
  return (
    <View
      style={{
        backgroundColor: kitchenMenuColor,
        borderColor: "#D8D8D8",
        borderWidth: 1,
        marginLeft: 10,
        width: "32%",
        padding: 15,
      }}
    >
      <Text style={{ color: "black" }}>2021-04-13 01:49:23</Text>
      <Text style={{ color: "black" }}>Served By: Sara</Text>

      <Text style={{ color: "black", marginVertical: 20 }}>In House</Text>

      {[1, 2, 3].map((item) => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 0,
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>Margarita</Text>
          <Text style={{ color: "black" }}>8.63</Text>
        </View>
      ))}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "black", flex: 1 }}>
          ........................
        </Text>
        <Text style={{ color: "black" }}>............</Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "black", flex: 1 }}>Cash:</Text>
        <Text style={{ color: "black" }}>-72.48</Text>
      </View>
    </View>
  );
};
