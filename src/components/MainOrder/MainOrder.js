import { Progress, Checkbox } from "native-base";
import React from "react";
import { View } from "react-native";
import { grayTextColor, kitchenMenuColor } from "../../theme/colors";
import { RegularButton } from "../Buttons/RegularButton";
import { Text } from "../Text/Text";

export const MainOrder = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderColor: kitchenMenuColor,
        borderWidth: 1,
        marginLeft: 10,
        width: "32%",
        padding: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            backgroundColor: kitchenMenuColor,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>Table 12</Text>
        </View>
        <Text style={{ color: "black", marginLeft: 15 }}>10:30:31</Text>
      </View>

      <Progress
        size={"xs"}
        style={{ marginTop: 20 }}
        colorScheme="green"
        value={35}
      />

      <Text style={{ color: grayTextColor, marginTop: 10 }}>Order by Sara</Text>
      <Text style={{ color: grayTextColor }}>08:19 PM</Text>

      {[1, 2, 3].map((item, i) => (
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              value="info"
              colorScheme="green"
              defaultIsChecked
              size="sm"
              style={{ opacity: 0 }}
            />

            <Text
              style={{
                color: "black",
                marginLeft: 10,
                fontSize: 18,
                fontFamily: "openSans_semiBold",
              }}
            >
              Margarita
            </Text>
          </View>
          {[1, 2, 3].map((item) => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Checkbox
                value="info"
                colorScheme="green"
                defaultIsChecked
                size="sm"
              />
              <Text
                style={{ color: grayTextColor, marginLeft: 10, fontSize: 16 }}
              >
                Margarita
              </Text>
            </View>
          ))}
        </View>
      ))}

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RegularButton white text={"Done"} style={{ width: "45%" }} />
        <RegularButton text={"serve"} style={{ width: "45%" }} />
      </View>
    </View>
  );
};
