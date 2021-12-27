import React from "react";
import { View } from "react-native";
import { kitchenMenuColor } from "../../theme/colors";
import { Text } from "../Text/Text";

export const SpikeOrder = ({ data }) => {
  const {
    timestamp = "",
    ticketNo = "",
    price = "",
    stature = "",
    tableInfo = {},
    catalog = [],
    loading = false,
    orderId = "",
    orderType = "",
  } = data;

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
      <Text style={{ color: "black" }}>{timestamp}</Text>
      {/* <Text style={{ color: "black" }}>Served By: Sara</Text> */}

      <Text style={{ color: "black", marginVertical: 20 }}>{orderType}</Text>
      {catalog.map((item) => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 0,
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>{item.mealName}</Text>
          <Text style={{ color: "black", marginLeft: 10 }}>
            {item?.mealPrice}
          </Text>
        </View>
      ))}
      <View
        style={{
          width: "100%",
        }}
      >
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
          <Text style={{ color: "black" }}>-{price}</Text>
        </View>
      </View>
    </View>
  );
};
