import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import pdfIcon from "../../../../assets/images/whitePdf.png";
import {
  chartHeaderColor,
  grayBorderColor,
  grayColor,
  grayShade1,
  grayShade2,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../../theme/colors";
import purpleCalender from "../../../../assets/images/purpleCalender.png";
import grayCalender from "../../../../assets/images/grayCalender.png";
import { Text } from "../../../../components/Text/Text";
import { ProgressBarBox } from "../../../../components/ProgressBarBox/ProgressBarBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { useSelector } from "react-redux";
import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";

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
          {/* <View
            style={{
              width: "100%",
              flexDirection: "row",
              backgroundColor: grayShade2,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(0)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 0 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 0 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Week
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(1)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 1 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 1 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Month
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(2)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 2 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 2 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Day
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              width: "100%",
            }}
          >
            {/* <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
              style={{
                borderWidth: 2,
                borderColor: grayColor,
                marginTop: 0,
                width: device === "tablet" ? "50%" : "100%",
              }}
            /> */}

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
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
