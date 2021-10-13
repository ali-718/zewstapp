import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { grayBorderColor, primaryColor } from "../../theme/colors";
import { AreaChart } from "react-native-svg-charts";
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
}) => {
  const device = useSelector((state) => state.system.device);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: grayBorderColor,
      }}
    >
      <View style={{ width: 150 }}>
        <Text
          style={{
            fontSize: device === "tablet" ? 18 : 16,
            color: "black",
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
};
