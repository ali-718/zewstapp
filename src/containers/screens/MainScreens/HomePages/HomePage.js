import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { Text } from "../../../../components/Text/Text";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import qrcodeIcon from "../../../../assets/images/qrcodeIcon.png";
import plusBorderIcon from "../../../../assets/images/plusBorderIcon.png";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import {
  backgroundGrayColor,
  borderColor2,
  chartColor1,
  chartColor2,
  chartGreenIndicator,
  chartPinkColor,
  chartPurpleColor,
  chartYellowColor,
  drawerHeadingColor,
  grayBorderColor,
  grayColor,
  grayMenuText,
  grayTextColor,
  lightPurple,
  lightPurpleBackground,
  lightSelectionShade,
  linearShade1,
  linearShade2,
  MonthBlueColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
  primaryShade3,
  progressDarkPurple,
  progressGray,
  textColor,
} from "../../../../theme/colors";
import { PendingPickUps } from "../../../../components/Meals/PendingPickUps";
import { ScanQrModal } from "../../../../components/Home/ScanQrModal";
import { Camera } from "expo-camera";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrimaryLocationAction,
  setPrimaryLocationAction,
} from "../../../../Redux/actions/AdminActions/LocationActions";
import { LinearGradient } from "expo-linear-gradient";
import {
  colors,
  currencyDisplay,
  HEIGHT,
  numberWithCommas,
} from "../../../../helpers/utlils";
import purpleCalender from "../../../../assets/images/purpleCalender.png";
import grayCalender from "../../../../assets/images/grayCalender.png";
import purpleMenuItem from "../../../../assets/images/purpleMenuItem.png";
import pdfIcon from "../../../../assets/images/pdfIcon.png";
import purpleOrderIcon from "../../../../assets/images/purpleOrderIcon.png";
import purpleCustomerIcon from "../../../../assets/images/purpleCustomerIcon.png";
import purpleTruck from "../../../../assets/images/purpleTruck.png";
import purpleBag from "../../../../assets/images/purpleBag.png";
import cancelledCalender from "../../../../assets/images/cancelledCalender.png";
import lightPurpleChart from "../../../../assets/images/lightPurpleChart.png";
import lightPurpleCashier from "../../../../assets/images/lightPurpleCashier.png";
import lightPurplePie from "../../../../assets/images/lightPurplePie.png";
import lightPurpleTicket from "../../../../assets/images/lightPurpleTicket.png";
import redArrow from "../../../../assets/images/redArrow.png";
import greenArrow from "../../../../assets/images/greenArrow.png";
import downloadPDF from "../../../../assets/images/downloadPDF.png";
import menuDotGray from "../../../../assets/images/menuDotGray.png";
import greenArrowUp from "../../../../assets/images/greenArrowUp.png";
import {
  Grid,
  LineChart,
  YAxis,
  BarChart,
  PieChart,
} from "react-native-svg-charts";
import { Icon, Progress, Select, ArrowDownIcon, Spinner } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import {
  fetchCostByCategoryAction,
  fetchFoodCountAction,
  fetchLossInKitchenAction,
  fetchForecastedSalesAction,
  fetchPriceFluctuationAction,
} from "../../../../Redux/actions/DashboardActions/DashboardActions";
import moment from "moment";
import { order } from "styled-system";

const chartData = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80];

const data1 = [72, 96, 33, 66];
const data2 = [89, 70, 86, 84];
const lineChartData = [
  {
    data: data1,
    svg: { stroke: MonthBlueColor },
  },
  {
    data: data2,
    svg: { stroke: chartGreenIndicator },
  },
];

const data = [
  {
    value: 66,
    svg: {
      fill: chartPurpleColor,
      onPress: () => null,
    },
    key: `pie-1`,
  },
  {
    value: 30,
    svg: {
      fill: chartYellowColor,
      onPress: () => null,
    },
    key: `pie-2`,
  },
  {
    value: 10,
    svg: {
      fill: chartPinkColor,
      onPress: () => null,
    },
    key: `pie-3`,
  },
  {
    value: 25,
    svg: {
      fill: chartGreenIndicator,
      onPress: () => null,
    },
    key: `pie-4`,
  },
];

const PriceFluctuation = ({ heading, belowText, device, rightText, color }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: borderColor2,
      paddingBottom: 10,
      marginBottom: 10,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 0.8,
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
        }}
        source={color ? greenArrow : redArrow}
      />
      <View style={{ marginLeft: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontFamily: "openSans_semiBold",
            color: "black",
          }}
        >
          {heading}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "openSans_bold",
            color: "gray",
          }}
        >
          {belowText}
        </Text>
      </View>
    </View>
  </View>
);
const LossInKitchen = ({ heading, belowText, device, logDate }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: borderColor2,
      paddingBottom: 10,
      marginBottom: 10,
    }}
  >
    <View style={{ flex: 0.9 }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          fontFamily: "openSans_semiBold",
          color: "black",
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "openSans_bold",
          color: "gray",
        }}
      >
        Quantity: {belowText}
      </Text>
    </View>

    <Text
      style={{
        fontSize: 12,
        color: grayTextColor,
      }}
    >
      {`${moment(logDate).format("D.M")} at ${moment(logDate).format("h:m a")}`}
    </Text>
  </View>
);

const IamgeItemBox = ({ device, image, heading, value }) => (
  <View
    style={{
      flexDirection: device === "tablet" ? "row" : "column",
      width: "30%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image
      source={image}
      style={{
        width: 35,
        height: 35,
        resizeMode: "contain",
      }}
    />
    <View
      style={{
        flex: device === "tablet" ? 1 : 0,
        marginLeft: device === "tablet" ? 10 : 0,
        width: "100%",
        alignItems: device === "tablet" ? "flex-start" : "center",
        marginTop: device === "tablet" ? 0 : 10,
      }}
    >
      <Text
        style={{
          color: grayTextColor,
          fontSize: 12,
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 16,
          fontFamily: "openSans_semiBold",
        }}
      >
        {value}
      </Text>
    </View>
  </View>
);

const ChartItemBox = ({ device, image, heading, value }) => (
  <View
    style={{
      flexDirection: "row",
      // justifyContent: "center",
    }}
  >
    <Image
      source={image}
      style={{
        width: device === "tablet" ? 35 : 30,
        height: device === "tablet" ? 35 : 30,
        resizeMode: "contain",
      }}
    />
    <View
      style={{
        marginLeft: 10,
      }}
    >
      <View
        style={{
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderColor: grayColor,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "openSans_bold",
          }}
        >
          {heading}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontFamily: "openSans_bold",
        }}
      >
        ${value}
      </Text>
    </View>
  </View>
);

export const HomePage = ({ setselected }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const [qrModal, setQrModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("This month");
  const [isDefaultLocation, setIsDefaultLocation] = useState(true);
  const isScreenFocused = useIsFocused();
  const {
    isLoading: firstSectionLoading,
    menuItems,
    orderItems,
    customerItems,
  } = useSelector((state) => state.dashboard.firstSection);
  const {
    isLoading: lossInKitchenLoading,
    list: lossInKitchenList,
    totalLoss: lossInKitchenTotalLoss,
  } = useSelector((state) => state.dashboard.lossInKitchen);
  const {
    isLoading: costByCategoryLoading,
    list: costByCategoryList = [],
    totalPrice: costByCategoryPrice,
  } = useSelector((state) => state.dashboard.costByCategory);
  const {
    isLoading: priceFluctuationLoading,
    list: priceFluctuationList = [],
  } = useSelector((state) => state.dashboard.priceFluctuation);
  const {
    isLoading: foreCastedSalesLoading,
    revenue: forecastedRevenue,
    sales: forecastedSales,
    actualSale: forecastedActualSales,
    interval: forecastedInterval,
  } = useSelector((state) => state.dashboard.forecastedSales);

  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [costByCategoryListData, setCostByCategoryListData] = useState([]);
  const [data1, setData1] = useState([0]);
  const [data2, setData2] = useState([0]);

  useEffect(() => {
    setData1([0, forecastedSales]);
    setData2([0, forecastedActualSales]);
  }, [forecastedSales, forecastedActualSales]);

  const barData = [
    {
      data: data1.map((value) => ({ value })),
      svg: {
        fill: chartColor1,
      },
    },
    {
      data: data2.map((value) => ({ value })),
      svg: {
        fill: chartColor2,
      },
    },
  ];

  useEffect(() => {
    if (costByCategoryList.length === 0) return;

    setCostByCategoryListData(
      costByCategoryList.map((item) => ({
        name: item.name,
        value: item.cost,
        svg: {
          fill: chartPurpleColor,
          onPress: () => null,
        },
        key: item.inventoryId,
      }))
    );
  }, [costByCategoryList]);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera  permissions to make this work!");
      return;
    }
    setQrModal(true);
  };

  useEffect(() => {
    if (!isScreenFocused) return;
    if (!!defaultLocation.locationId == false) return;

    Promise.all([
      fetchFirstSection(),
      fetchLossInKitchenSection(),
      fetchCostByCategorySection(),
      fetchForecastedSalesSection(),
      fetchPriceFluctuation(),
    ]);
  }, [selectedTime, isScreenFocused, defaultLocation]);

  useEffect(() => {
    dispatch(getPrimaryLocationAction(user?.clientId));
  }, [user]);

  useEffect(() => {
    const location = defaultLocation?.locationId;

    if (location === null) {
      setIsDefaultLocation(false);
      if (noRedirect) return;
      navigation.navigate("location");
      ToastSuccess("Kindly select your default location");
      return;
    }

    setIsDefaultLocation(true);
  }, [defaultLocation]);

  const fetchFirstSection = async () => {
    const location = defaultLocation.locationId;

    console.log("location");
    console.log(location);

    if (!!location == false) return;

    dispatch(
      fetchFoodCountAction({
        locationId: location ?? "",
        interval:
          selectedTime === "This month"
            ? "month"
            : selectedTime === "This year"
            ? "year"
            : selectedTime === "This day"
            ? "day"
            : "",
        startDate:
          selectedTime === "This month"
            ? moment().subtract(30, "days").format("DD-M-yyy")
            : selectedTime === "This year"
            ? moment().subtract(365, "days").format("DD-M-yyy")
            : selectedTime === "This day"
            ? moment().format("DD-M-yyy")
            : "",
        endDate: moment().format("DD-M-yyy"),
      })
    );
  };

  const fetchPriceFluctuation = async () => {
    const location = defaultLocation.locationId;

    if (!!location == false) return;

    dispatch(
      fetchPriceFluctuationAction({
        locationId: location ?? "",
        interval:
          selectedTime === "This month"
            ? "month"
            : selectedTime === "This year"
            ? "year"
            : selectedTime === "This day"
            ? "day"
            : "",
        month:
          selectedTime === "This month"
            ? "1"
            : selectedTime === "This year"
            ? "12"
            : "1",
      })
    );
  };

  const fetchCostByCategorySection = async () => {
    const location = defaultLocation.locationId;

    if (!!location === false) return;

    dispatch(
      fetchCostByCategoryAction({
        // locationId: "0f06628b-9b71-48b6-be64-5cc7a377f501",
        locationId: location ?? "",
        interval:
          selectedTime === "This month"
            ? "month"
            : selectedTime === "This year"
            ? "year"
            : selectedTime === "This day"
            ? "day"
            : "",
        startDate:
          selectedTime === "This month"
            ? moment().subtract(30, "days").format("DD-M-yyy")
            : selectedTime === "This year"
            ? moment().subtract(365, "days").format("DD-M-yyy")
            : selectedTime === "This day"
            ? moment().format("DD-M-yyy")
            : "",
        endDate: moment().format("DD-M-yyy"),
      })
    );
  };

  const fetchForecastedSalesSection = async () => {
    const location = defaultLocation.locationId;

    if (!!location === false) return;

    dispatch(
      fetchForecastedSalesAction({
        // locationId: "0f06628b-9b71-48b6-be64-5cc7a377f501",
        locationId: location ?? "",
        interval:
          selectedTime === "This month"
            ? "month"
            : selectedTime === "This year"
            ? "year"
            : selectedTime === "This day"
            ? "day"
            : "",
        startDate:
          selectedTime === "This month"
            ? moment().subtract(30, "days").format("DD-M-yyy")
            : selectedTime === "This year"
            ? moment().subtract(365, "days").format("DD-M-yyy")
            : selectedTime === "This day"
            ? moment().format("DD-M-yyy")
            : "",
        endDate: moment().format("DD-M-yyy"),
      })
    );
  };

  const fetchLossInKitchenSection = async () => {
    const location = defaultLocation.locationId;

    if (!!location === false) return;

    dispatch(
      fetchLossInKitchenAction({
        locationId: location ?? "",
        interval:
          selectedTime === "This month"
            ? "month"
            : selectedTime === "This year"
            ? "year"
            : selectedTime === "This day"
            ? "day"
            : "",
        startDate:
          selectedTime === "This month"
            ? moment().subtract(30, "days").format("DD-M-yyy")
            : selectedTime === "This year"
            ? moment().subtract(365, "days").format("DD-M-yyy")
            : selectedTime === "This day"
            ? moment().format("DD-M-yyy")
            : "",
        endDate: moment().format("DD-M-yyy"),
      })
    );
  };

  const changeTime = (val) => setSelectedTime(val);

  return (
    <MainScreenContainer>
      {!!defaultLocation.locationId ? (
        <LinearGradient
          colors={[backgroundGrayColor, backgroundGrayColor]}
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              marginBottom: 80,
              alignItems: "center",
              marginTop: 20,
              zIndex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: device === "tablet" ? "row" : "column",
                  alignItems: device === "tablet" ? "center" : "flex-start",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: device === "tablet" ? 24 : 20,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Overview
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: device === "tablet" ? 20 : 0,
                    zIndex: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 16 : 14,
                      color: drawerHeadingColor,
                    }}
                  >
                    Show:
                  </Text>

                  <Dropdown
                    noPlaceholder
                    selectedMenu={selectedTime}
                    setMenu={changeTime}
                    placeholder={""}
                    menus={["This month", "This year", "This day"]}
                    textStyle={{ fontSize: device === "tablet" ? 16 : 14 }}
                    style={{
                      zIndex: 3,
                      width: 100,
                      borderBottomWidth: 0,
                      marginTop: device === "tablet" ? -5 : -15,
                      height: device === "tablet" ? 50 : 40,
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                    innerStyle={{
                      zIndex: 3,
                      width: device === "tablet" ? 130 : 120,
                      borderBottomWidth: 0,
                      marginTop: device === "tablet" ? -5 : 0,
                      height: device === "tablet" ? 50 : 40,
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                    iconStyle={{
                      marginTop: device === "tablet" ? 30 : 40,
                    }}
                    dropDownOffset={device === "tablet" ? 50 : 40}
                  />
                </View>
              </View>

              <RegularButton
                iconLeft={downloadPDF}
                iconStyle={{
                  width: device === "tablet" ? 16 : 16,
                  height: device === "tablet" ? 20 : 20,
                  resizeMode: "contain",
                }}
                text={device === "tablet" ? "GENERATE REPORT" : ""}
                colors={["white", "white"]}
                noText={device !== "tablet"}
                style={{
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: device === "tablet" ? 220 : 50,
                  height: device === "tablet" ? 50 : 40,
                  borderRadius: 15,
                }}
                textStyle={{ color: primaryColor, fontSize: 16 }}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: device === "tablet" ? "60%" : "100%" }}>
                {firstSectionLoading ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <Spinner size={"large"} color={primaryColor} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <IamgeItemBox
                      image={purpleMenuItem}
                      heading={"Menu items"}
                      value={menuItems}
                      device={device}
                    />

                    <IamgeItemBox
                      image={purpleOrderIcon}
                      heading={"Orders"}
                      value={orderItems}
                      device={device}
                    />

                    <IamgeItemBox
                      image={purpleCustomerIcon}
                      heading={"Customers"}
                      value={customerItems}
                      device={device}
                    />
                  </View>
                )}

                {foreCastedSalesLoading ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <Spinner size={"large"} color={primaryColor} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 20,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "black",
                              fontFamily: "openSans_semiBold",
                            }}
                          >
                            Revenue
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: grayTextColor,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Total: ${numberWithCommas(forecastedRevenue)}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: device === "tablet" ? 0.7 : 0.9,
                          flexDirection: device === "tablet" ? "row" : "row",
                          justifyContent: "space-between",
                          marginLeft: device === "tablet" ? 0 : 10,
                        }}
                      >
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: chartColor1,
                                width: 12,
                                height: 12,
                                borderRadius: 100,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                color: grayTextColor,
                                marginLeft: 10,
                              }}
                            >
                              Forecasted Sales
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                              fontFamily: "openSans_semiBold",
                            }}
                          >
                            Total: ${currencyDisplay(forecastedSales)}
                          </Text>
                        </View>

                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: device === "tablet" ? 0 : 0,
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: chartColor2,
                                width: 12,
                                height: 12,
                                borderRadius: 100,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                color: grayTextColor,
                                marginLeft: 10,
                              }}
                            >
                              Actual Sales
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                              fontFamily: "openSans_semiBold",
                            }}
                          >
                            {console.log(
                              `forecasted sales`,
                              forecastedActualSales
                            )}
                            Total: ${currencyDisplay(forecastedActualSales)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 20,
                      }}
                    >
                      <YAxis
                        data={[...data1, ...data2]}
                        style={{ marginBottom: 10 }}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ fontSize: 10, fill: "grey" }}
                      />
                      <BarChart
                        animate={true}
                        style={{ height: 200, marginLeft: 10, flex: 1 }}
                        data={barData}
                        yAccessor={({ item }) => item.value}
                        xAccessor={({ item }) => item.value}
                        spacingInner={0.8}
                        contentInset={{ top: 20, bottom: 20 }}
                      ></BarChart>
                    </View>
                  </View>
                )}

                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    paddingVertical: 20,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("lossInKitchen")}
                    style={{ width: "100%" }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 18,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Loss in kitchen
                        </Text>
                        <Text
                          style={{
                            color: grayTextColor,
                            fontSize: 16,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Total: ${lossInKitchenTotalLoss}
                        </Text>
                      </View>

                      <Image
                        source={menuDotGray}
                        style={{ width: 20, resizeMode: "contain" }}
                      />
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        padding: 10,
                        marginTop: 10,
                      }}
                    >
                      {lossInKitchenLoading ? (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                            borderRadius: 10,
                            padding: 10,
                            paddingVertical: 20,
                          }}
                        >
                          <Spinner size={"large"} color={primaryColor} />
                        </View>
                      ) : (
                        lossInKitchenList
                          .slice(0, 3)
                          .map((item, i) => (
                            <LossInKitchen
                              key={i}
                              heading={item.category}
                              belowText={item.wastedQuantity}
                              device={device}
                              logDate={item.logDate}
                            />
                          ))
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: device === "tablet" ? "38%" : "100%" }}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    paddingVertical: 20,
                    paddingBottom: 30,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          fontFamily: "openSans_semiBold",
                        }}
                      >
                        Food waste profit
                      </Text>
                      <Text
                        style={{
                          color: grayTextColor,
                          fontSize: 16,
                          fontFamily: "openSans_semiBold",
                        }}
                      >
                        Total this month: $6.540
                      </Text>
                    </View>

                    <Image
                      source={menuDotGray}
                      style={{ width: 20, resizeMode: "contain" }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: "rgba(61,213,152,0.1)",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        borderRadius: 20,
                      }}
                    >
                      <Image
                        source={greenArrowUp}
                        style={{ width: 10, height: 10, resizeMode: "contain" }}
                      />
                    </View>

                    <Text
                      style={{
                        color: chartGreenIndicator,
                        fontFamily: "openSans_bold",
                        fontSize: 12,
                        marginLeft: 10,
                      }}
                    >
                      +2.5%
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 20,
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: MonthBlueColor,
                          width: 8,
                          height: 8,
                          borderRadius: 100,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: grayTextColor,
                          marginLeft: 10,
                        }}
                      >
                        This Month
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 20,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: chartGreenIndicator,
                          width: 8,
                          height: 8,
                          borderRadius: 100,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: grayTextColor,
                          marginLeft: 10,
                        }}
                      >
                        Last Month
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 20 }}>
                    <View
                      style={{
                        flex: device === "tablet" ? 0.5 : 1,
                        flexDirection: "row",
                      }}
                    >
                      <YAxis
                        data={[...data1, ...data2]}
                        style={{ marginBottom: 10 }}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{ fontSize: 10, fill: "grey" }}
                      />
                      <LineChart
                        style={{ height: 200, flex: 1 }}
                        data={lineChartData}
                        svg={{
                          strokeWidth: 5,
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                      ></LineChart>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    width: "100%",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontFamily: "openSans_semiBold",
                      }}
                    >
                      Top Price Fluctuations
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={downloadPDF}
                        style={{
                          width: 16,
                          resizeMode: "contain",
                          tintColor: primaryColor,
                        }}
                      />
                      <Image
                        source={menuDotGray}
                        style={{
                          width: 18,
                          resizeMode: "contain",
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  </View>

                  {priceFluctuationLoading ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 10,
                        paddingVertical: 20,
                      }}
                    >
                      <Spinner size={"large"} color={primaryColor} />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        padding: 10,
                      }}
                    >
                      {priceFluctuationList?.slice(0, 3).map((item, i) => (
                        <PriceFluctuation
                          heading={item?.name}
                          belowText={`$${item?.cost} in the last invoice`}
                          device={device}
                          color={
                            item?.fluctuation === "positive" ? true : false
                          }
                        />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: device === "tablet" ? "row" : "column",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                width: "100%",
                marginTop: 20,
                justifyContent:
                  device === "tablet" ? "space-between" : "center",
                alignItems: "center",
              }}
            >
              {costByCategoryLoading ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    paddingVertical: 20,
                  }}
                >
                  <Spinner size={"large"} color={primaryColor} />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontFamily: "openSans_semiBold",
                      }}
                    >
                      Cost by Category
                    </Text>
                    <Text
                      style={{
                        color: grayTextColor,
                        fontSize: 16,
                        fontFamily: "openSans_semiBold",
                      }}
                    >
                      Total: ${costByCategoryPrice}
                    </Text>
                  </View>

                  {device !== "tablet" ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 20,
                      }}
                    >
                      <View
                        style={{
                          width: 200,
                          marginTop: device === "tablet" ? 0 : 20,
                        }}
                      >
                        <PieChart
                          style={{
                            height: device === "tablet" ? 100 : 200,
                            flex: 1,
                          }}
                          data={costByCategoryListData}
                          innerRadius={"80%"}
                          // padAngle={0}
                        />
                        <View
                          style={{
                            alignItems: "center",
                            position: "absolute",
                            bottom: "35%",
                            right: "35%",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "black",
                              fontFamily: "openSans_bold",
                            }}
                          >
                            ${costByCategoryPrice}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginTop: 0,
                            }}
                          >
                            total costs
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                      }}
                    >
                      <FlatList
                        data={costByCategoryListData}
                        key={device === "tablet" ? 1 : 2}
                        numColumns={device === "tablet" ? 2 : 1}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: 20,
                              width: device === "tablet" ? "35%" : "100%",
                              marginLeft:
                                device === "tablet"
                                  ? (index + 1) % 2 === 0
                                    ? "20%"
                                    : 0
                                  : 0,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: item.svg.fill,
                                  width: 10,
                                  height: 10,
                                  borderRadius: 100,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: grayTextColor,
                                  marginLeft: 10,
                                }}
                              >
                                {item.name}
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontSize: 12,
                                color: chartGreenIndicator,
                                marginLeft: 50,
                              }}
                            >
                              {item.value}%
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              )}

              {device === "tablet" ? (
                costByCategoryLoading ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <Spinner size={"large"} color={primaryColor} />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 200,
                      marginTop: device === "tablet" ? 0 : 20,
                    }}
                  >
                    <PieChart
                      style={{
                        height: 200,
                        flex: 1,
                      }}
                      data={costByCategoryListData}
                      innerRadius={"80%"}
                      // padAngle={0}
                    />
                    <View
                      style={{
                        alignItems: "center",
                        position: "absolute",
                        bottom: "35%",
                        right: "35%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",
                          fontFamily: "openSans_bold",
                        }}
                      >
                        ${costByCategoryPrice}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: grayTextColor,
                          marginTop: 0,
                        }}
                      >
                        total costs
                      </Text>
                    </View>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </LinearGradient>
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT - 100,
          }}
        >
          <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
            You need to add atleast one location to view dashboard 😃
          </Text>
        </View>
      )}
    </MainScreenContainer>
  );
};

{
  /* <MainScreenContainer
leftImage={person}
rightImage={bellIcon}
title={"Menu"}
>
<View
  style={{
    width: "90%",
    marginBottom: 50,
    alignItems: "center",
    marginTop: 20,
  }}
>
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Text style={{ fontSize: 30, color: "black" }}>Hello!</Text>

    <View
      style={{ flexDirection: "row", alignItems: "center", flex: 0.9 }}
    >
      <View style={{ width: "85%", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 16, fontFamily: "openSans_semiBold" }}>
          Ali Haider
        </Text>
        <Text style={{ fontSize: 13, marginTop: 5 }}>
          Rocco Italian Grill - Arcadia
        </Text>
      </View>

      <View
        style={{
          width: "15%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Image
          source={forwardIcon}
          style={{
            width: 15,
            height: 15,
            resizeMode: "contain",
            tintColor: "black",
          }}
        />
      </View>
    </View>
  </View>

  <View
    style={{
      width: "100%",
      flexDirection: "row",
      marginTop: 30,
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <RegularButton
      iconLeft={qrcodeIcon}
      iconStyle={{ width: 20, height: 20, resizeMode: "contain" }}
      style={{ width: "48%" }}
      text={"Scan QR"}
      onPress={openCamera}
    />

    <RegularButton
      iconLeft={plusBorderIcon}
      iconStyle={{ width: 20, height: 20, resizeMode: "contain" }}
      style={{ width: "48%" }}
      text={"Add Meal"}
      onPress={() => navigation.navigate("addMeal")}
    />
  </View>

  <View style={{ width: "100%", marginTop: 20 }}>
    <ProgressBarBox
      leftTextTop={"Revenue"}
      leftTextBottom={"This Week"}
      rightText={`$${"434.02"}`}
      leftProgressText={`Cost $${"4,340.19"}`}
      rightProgressText={`Refund ${"10%"}`}
      progressValue={80}
    />
  </View>

  <View style={{ width: "100%", marginTop: 20 }}>
    <ProgressBarBox
      leftTextTop={"Meals"}
      leftTextBottom={"Served"}
      rightText={"868"}
      leftProgressText={`Current week ${"868"}`}
      rightProgressText={`Last week ${"1,230"}`}
      progressValue={80}
    />
  </View>

  <View
    style={{
      width: "100%",
      marginTop: 20,
      padding: 15,
      backgroundColor: "white",
      borderRadius: 10,
    }}
  >
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: grayColor,
        paddingBottom: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontFamily: "openSans_bold" }}>
        Pending pickups
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "openSans_bold",
          color: primaryShade1,
        }}
      >
        3 pending
      </Text>
    </View>

    <View style={{ width: "100%", marginTop: 20 }}>
      <PendingPickUps
        orderNo={"694-0876"}
        order={"Chicken Alfredo, Beef Bologon"}
        time={"7:30pm"}
        onPress={() =>
          navigation.navigate("orderDetail", {
            data: {
              orderNo: "694-0876",
            },
          })
        }
      />
    </View>

    <View style={{ width: "100%", marginTop: 20 }}>
      <PendingPickUps
        orderNo={"694-0877"}
        order={"Chicken Tikka, Buffalo Wings"}
        time={"9:30pm"}
        onPress={() =>
          navigation.navigate("orderDetail", {
            data: {
              orderNo: "694-0877",
            },
          })
        }
      />
    </View>

    <View style={{ width: "100%", marginTop: 20 }}>
      <PendingPickUps
        orderNo={"694-0879"}
        order={"Chicken Wings, Chicken Sashlik"}
        time={"11:30pm"}
        onPress={() =>
          navigation.navigate("orderDetail", {
            data: {
              orderNo: "694-0879",
            },
          })
        }
      />
    </View>
  </View>
</View>

<ScanQrModal visible={qrModal} onRequestClose={() => setQrModal(false)} />
</MainScreenContainer> */
}
