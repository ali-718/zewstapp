import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import pdfIcon from "../../../../assets/images/whitePdf.png";
import {
  borderColor2,
  chartHeaderColor,
  drawerHeadingColor,
  grayBorderColor,
  grayColor,
  grayShade1,
  grayShade2,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../../theme/colors";
import blackBackArrow from "../../../../assets/images/blackBackArrow.png";
import purpleCalender from "../../../../assets/images/purpleCalender.png";
import grayCalender from "../../../../assets/images/grayCalender.png";
import { Text } from "../../../../components/Text/Text";
import { ProgressBarBox } from "../../../../components/ProgressBarBox/ProgressBarBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { useSelector } from "react-redux";
import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";
import { borderColor } from "styled-system";
import { useNavigation } from "@react-navigation/core";

const data = [
  {
    item: "Chicken",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
  },
  {
    item: "Cheese",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [1, 2, 3, 4, 5, 2, 1, 5],
  },
  {
    item: "Beef",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [1, 2, 3, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
  {
    item: "Jalapenos",
    previousSales: "1020",
    day1: "10",
    day2: "20",
    today: "35",
    predictedRequiredStaff: "60",
    predictedCost: "3000",
    trendsInChange: [10, 4, 2, 1, 5, 10, 15],
  },
];

export const LossInKitchen = () => {
  const [selectedAnnual, setselectedAnnual] = useState(0);
  const [search, setSearch] = useState("");
  const [lossInKitchen, setlossInKitchen] = useState(data);
  const device = useSelector((state) => state.system.device);
  const navigation = useNavigation();

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = data;

    const finalData = realData.filter((item) =>
      item?.item?.toLowerCase()?.includes(keyword)
    );

    setlossInKitchen(finalData);
  };

  return (
    <MainScreenContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 50,
        }}
      >
        <View style={{ width: "95%", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={blackBackArrow}
                  style={{ width: 20, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  fontSize: device === "tablet" ? 30 : 24,
                  fontFamily: "openSans_bold",
                  marginLeft: 20,
                }}
              >
                Loss in kitchen
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 10,
                backgroundColor: "white",
                marginTop: 20,
                paddingTop: 0,
                flex: 1,
              }}
            >
              <SearchInput
                style={{
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: grayBorderColor,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
                search={search}
                setSearch={setSearch}
                searchKeyword={searchKeyword}
              />

              {device === "tablet" ? (
                <ScrollView horizontal style={{ flex: 1 }}>
                  <View
                    style={{
                      width: "100%",
                      marginBottom: 20,
                      marginTop: 10,
                    }}
                  >
                    {/* headings start */}
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        paddingVertical: 15,
                        backgroundColor: chartHeaderColor,
                        borderRadius: 10,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <View style={{ width: 150 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                            marginLeft: 10,
                          }}
                        >
                          Items
                        </Text>
                      </View>
                      <View style={{ width: 150 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Previous Sales
                        </Text>
                      </View>
                      <View style={{ width: 100 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Day 1
                        </Text>
                      </View>
                      <View style={{ width: 100 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Day 2
                        </Text>
                      </View>
                      <View style={{ width: 100 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Today
                        </Text>
                      </View>
                      <View style={{ width: 250 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Predicted Required Stuff
                        </Text>
                      </View>
                      <View style={{ width: 150 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Predicted Cost
                        </Text>
                      </View>
                      <View style={{ width: 180 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: device === "tablet" ? 18 : 16,
                            color: "black",
                          }}
                        >
                          Trends in Change
                        </Text>
                      </View>
                    </View>
                    {/* headings ends */}
                    <View style={{ backgroundColor: "white" }}>
                      {lossInKitchen.map((item, i) => (
                        <PredictionTableItem
                          gray={device === "tablet" ? i % 2 === 1 : false}
                          key={i}
                          item={item.item}
                          previousSales={item.previousSales}
                          day1={item.day1}
                          day2={item.day2}
                          today={item.today}
                          predictedRequiredStaff={item.predictedRequiredStaff}
                          predictedCost={item.predictedCost}
                          trendsInChange={item.trendsInChange}
                        />
                      ))}
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <>
                  {lossInKitchen.map((item, i) => (
                    <PredictionTableItem
                      gray={device === "tablet" ? i % 2 === 1 : false}
                      key={i}
                      item={item.item}
                      previousSales={item.previousSales}
                      day1={item.day1}
                      day2={item.day2}
                      today={item.today}
                      predictedRequiredStaff={item.predictedRequiredStaff}
                      predictedCost={item.predictedCost}
                      trendsInChange={item.trendsInChange}
                    />
                  ))}
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
