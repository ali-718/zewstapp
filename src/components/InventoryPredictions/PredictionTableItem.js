import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  borderColor2,
  chartHeaderColor,
  grayBorderColor,
  grayMenuText,
  grayTextColor,
  primaryColor,
} from "../../theme/colors";
import { AreaChart } from "react-native-svg-charts";
import { Checkbox } from "native-base";
import { Text } from "../Text/Text";
// import * as shape from 'd3-shape'

export const PredictionTableItem = ({
  item,
  previousSales,
  day1,
  day2,
  today,
  predictedRequiredStaff,
  predictedCost,
  trendsInChange,
  gray,
}) => {
  const device = useSelector((state) => state.system.device);
  const [selected, setSelected] = useState(false);

  if (device === "tablet") {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingVertical: 15,
          backgroundColor: gray ? chartHeaderColor : "white",
        }}
      >
        <View style={{ width: 150 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
              marginLeft: 10,
            }}
          >
            {item}
          </Text>
        </View>
        <View style={{ width: 150 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            ${previousSales}
          </Text>
        </View>
        <View style={{ width: 100 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            {day1}Kg
          </Text>
        </View>
        <View style={{ width: 100 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            {day2}Kg
          </Text>
        </View>
        <View style={{ width: 100 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            {today}Kg
          </Text>
        </View>
        <View style={{ width: 250 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            {predictedRequiredStaff}Kg
          </Text>
        </View>
        <View style={{ width: 150 }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 18 : 16,
              color: "black",
            }}
          >
            ${predictedCost}
          </Text>
        </View>
        <View style={{ width: 150 }}>
          <AreaChart
            style={{ height: 20 }}
            data={trendsInChange}
            //   contentInset={{ top: 30, bottom: 30 }}
            // curve={shape.curveNatural}
            svg={{ stroke: primaryColor }}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 15,
        backgroundColor: gray ? chartHeaderColor : "white",
        borderBottomWidth: 1,
        borderColor: borderColor2,
      }}
    >
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            {/* <Checkbox
              onChange={() => setSelected(!selected)}
              isChecked={selected}
              colorScheme="green"
            /> */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={{
                  flex: 0.9,
                  color: "black",
                  fontFamily: "openSans_semiBold",
                  fontSize: 16,
                }}
                numberOfLines={1}
              >
                Test food
              </Text>
              <Text
                style={{
                  flex: 0.9,
                  color: grayMenuText,
                  fontSize: 12,
                }}
                numberOfLines={1}
              >
                Test food
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 0.2,
              }}
            >
              <Text
                style={{
                  flex: 0.9,
                  color: "black",
                  fontFamily: "openSans_semiBold",
                  fontSize: 16,
                }}
                numberOfLines={1}
              >
                $122
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
              marginTop: 5,
            }}
          >
            <View
              style={{
                flex: 0.7,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: grayTextColor, fontSize: 12 }}>
                Q2: <Text style={{ color: "black" }}>2</Text>
              </Text>
              <Text style={{ color: grayTextColor, fontSize: 12 }}>
                Date: <Text style={{ color: "black" }}>28.10.21</Text>
              </Text>
              <Text style={{ color: grayTextColor, fontSize: 12 }}>
                Date: <Text style={{ color: "black" }}>28.10.21</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
