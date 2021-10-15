import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import bellIcon from "../../../../assets/images/bellIcon.png";
import {
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

export const InventoryPredictionsPage = () => {
  const [selectedAnnual, setselectedAnnual] = useState(0);
  const [search, setSearch] = useState("");
  const [predictionItems, setPredictionItems] = useState(data);
  const device = useSelector((state) => state.system.device);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = data;

    const finalData = realData.filter((item) =>
      item?.item?.toLowerCase()?.includes(keyword)
    );

    setPredictionItems(finalData);
  };

  return (
    <MainScreenContainer
      leftImage={person}
      rightImage={bellIcon}
      title={"Inventory Predictions"}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 50,
        }}
      >
        <View style={{ width: "90%", alignItems: "center" }}>
          <View
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
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 20,
              borderRadius: 10,
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
              style={{
                borderWidth: 2,
                borderColor: grayColor,
                marginTop: 0,
                width: device === "tablet" ? "50%" : "100%",
              }}
            />

            <ScrollView horizontal style={{ flex: 1 }}>
              <View
                style={{
                  width: "100%",
                  marginBottom: 20,
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                {/* headings start */}
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
                        fontFamily: "openSans_bold",
                        fontSize: device === "tablet" ? 18 : 16,
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
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
                        color: grayTextColor,
                      }}
                    >
                      Trends in Change
                    </Text>
                  </View>
                </View>
                {/* headings ends */}
                {predictionItems.map((item, i) => (
                  <PredictionTableItem
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
            </ScrollView>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
