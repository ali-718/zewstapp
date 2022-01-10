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
import { useDispatch, useSelector } from "react-redux";
import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";
import { borderColor } from "styled-system";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import moment from "moment";
import { fetchLossInKitchenAction } from "../../../../Redux/actions/DashboardActions/DashboardActions";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";

export const LossInKitchen = () => {
  const [selectedAnnual, setselectedAnnual] = useState(0);
  const [search, setSearch] = useState("");
  const [lossInKitchen, setlossInKitchen] = useState([]);
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const {
    isLoading: lossInKitchenLoading,
    list: lossInKitchenList,
    totalLoss: lossInKitchenTotalLoss,
  } = useSelector((state) => state.dashboard.lossInKitchen);
  const navigation = useNavigation();
  const screenFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (lossInKitchenList.length === 0) return;

    setlossInKitchen(lossInKitchenList);
  }, [lossInKitchenList]);

  useEffect(() => {
    if (!screenFocused) return;

    dispatch(
      fetchLossInKitchenAction({
        locationId: defaultLocation?.locationId,
        interval: "month",
        startDate: moment().subtract(30, "days").format("DD-M-yyy"),
        endDate: moment().format("DD-M-yyy"),
        isError: true,
      })
    );
  }, [screenFocused]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();

    const finalData = lossInKitchenList.filter((item) =>
      item?.itemName?.toLowerCase()?.includes(keyword)
    );

    setlossInKitchen(finalData);
  };

  return (
    <MainScreenContainer>
      {lossInKitchenLoading ? (
        <LoadingPage />
      ) : (
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
                        <View style={{ width: 250 }}>
                          <Text
                            style={{
                              fontFamily: "openSans_bold",
                              fontSize: 11,
                              color: "black",
                              marginLeft: 10,
                              textTransform: "uppercase",
                            }}
                          >
                            Items
                          </Text>
                        </View>
                        <View style={{ width: 150 }}>
                          <Text
                            style={{
                              fontFamily: "openSans_bold",
                              fontSize: 11,
                              color: "black",
                              textTransform: "uppercase",
                            }}
                          >
                            QUANTITY
                          </Text>
                        </View>
                        <View style={{ width: 150 }}>
                          <Text
                            style={{
                              fontFamily: "openSans_bold",
                              fontSize: 11,
                              color: "black",
                              textTransform: "uppercase",
                            }}
                          >
                            date
                          </Text>
                        </View>
                        <View style={{ width: 150 }}>
                          <Text
                            style={{
                              fontFamily: "openSans_bold",
                              fontSize: 11,
                              color: "black",
                              textTransform: "uppercase",
                            }}
                          >
                            time
                          </Text>
                        </View>
                        <View style={{ width: 150 }}>
                          <Text
                            style={{
                              fontFamily: "openSans_bold",
                              fontSize: 11,
                              color: "black",
                              textTransform: "uppercase",
                            }}
                          >
                            total cost
                          </Text>
                        </View>
                      </View>
                      {/* headings ends */}
                      <View style={{ backgroundColor: "white" }}>
                        {lossInKitchen.map((item, i) => (
                          <PredictionTableItem
                            gray={device === "tablet" ? i % 2 === 1 : false}
                            key={i}
                            item={item.itemName}
                            quantity={item.wastedQuantity}
                            date={moment(item.logDate).format("D.M.yyyy")}
                            time={moment(item.logDate).format("h:mm a")}
                            costPerUnit={item.costPerUnit}
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
                        item={item.itemName}
                        quantity={item.wastedQuantity}
                        date={moment(item.logDate).format("D.M.yyyy")}
                        time={moment(item.logDate).format("h:mm a")}
                        costPerUnit={item.costPerUnit}
                      />
                    ))}
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </MainScreenContainer>
  );
};
