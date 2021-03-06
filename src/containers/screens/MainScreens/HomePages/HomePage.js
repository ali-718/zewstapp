import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import menuIcon from "../../../../assets/images/menuIcon.png";
import bellIcon from "../../../../assets/images/bellIcon.png";
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
import { setPrimaryLocationAction } from "../../../../Redux/actions/AdminActions/LocationActions";
import { LinearGradient } from "expo-linear-gradient";
import { colors, HEIGHT } from "../../../../helpers/utlils";
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
import { fetchFoodCountAction } from "../../../../Redux/actions/DashboardActions/DashboardActions";
import moment from "moment";
import { order } from "styled-system";

const chartData = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80];

const data1 = [72, 96, 33, 66];
const data2 = [89, 70, 86, 84];

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
          width: device === "tablet" ? 30 : 20,
          height: device === "tablet" ? 30 : 20,
          resizeMode: "contain",
        }}
        source={color ? greenArrow : redArrow}
      />
      <View style={{ marginLeft: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: device === "tablet" ? 20 : 16,
            fontFamily: "openSans_bold",
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
const LossInKitchen = ({ heading, belowText, device }) => (
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
          fontSize: device === "tablet" ? 20 : 16,
          fontFamily: "openSans_semiBold",
          color: "black",
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          fontSize: 13,
          fontFamily: "openSans_bold",
          color: "gray",
        }}
      >
        Quantity: {belowText}
      </Text>
    </View>

    <Text
      style={{
        fontSize: 13,
        color: primaryColor,
      }}
    >
      02.10 at 2:21 PM
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
          fontSize: 16,
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 22,
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

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera  permissions to make this work!");
      return;
    }
    setQrModal(true);
  };

  const checkDefaultLocation = async () => {
    const location = await AsyncStorage.getItem("defaultLocation");

    if (location === null) {
      setIsDefaultLocation(false);
      navigation.navigate("location");
      ToastSuccess("Kindly select your default location");
      return;
    }

    dispatch(setPrimaryLocationAction(JSON.parse(location), true));
  };

  useEffect(() => {
    if (!isScreenFocused) return;
    checkDefaultLocation();

    Promise.all([fetchFirstSection()]);
  }, [isScreenFocused]);

  useEffect(() => {
    fetchFirstSection();
  }, [selectedTime]);

  const fetchFirstSection = async () => {
    const location = await AsyncStorage.getItem("defaultLocation");

    dispatch(
      fetchFoodCountAction({
        locationId: JSON.parse(location).locationId ?? "",
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
      {isDefaultLocation ? (
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
                    fontSize: device === "tablet" ? 30 : 24,
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
                      fontSize: device === "tablet" ? 20 : 16,
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
                    style={{
                      zIndex: 3,
                      width: device === "tablet" ? 150 : 130,
                      borderBottomWidth: 0,
                      marginTop: 0,
                      height: device === "tablet" ? 50 : 40,
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                    iconStyle={{ marginTop: 10 }}
                    dropDownOffset={device === "tablet" ? 50 : 40}
                  />
                </View>
              </View>

              <RegularButton
                iconLeft={downloadPDF}
                iconStyle={{
                  width: device === "tablet" ? 20 : 20,
                  height: device === "tablet" ? 25 : 25,
                  resizeMode: "contain",
                }}
                text={device === "tablet" ? "GENERATE REPORT" : ""}
                colors={["white", "white"]}
                noText={device !== "tablet"}
                style={{
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: device === "tablet" ? 270 : 50,
                  height: device === "tablet" ? 50 : 40,
                  borderRadius: 15,
                }}
                textStyle={{ color: primaryColor }}
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
                        <Text
                          style={{
                            fontSize: 14,
                            color: grayTextColor,
                            marginLeft: 10,
                          }}
                        >
                          This month
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: grayTextColor,
                          fontFamily: "openSans_semiBold",
                        }}
                      >
                        Total: $38,451
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 0.9,
                        flexDirection: device === "tablet" ? "row" : "column",
                        justifyContent: "space-between",
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
                              fontSize: 14,
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
                          Total: $38,451
                        </Text>
                      </View>

                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: device === "tablet" ? 0 : 10,
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
                              fontSize: 14,
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
                          Total: $38,451
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
                      contentInset={{ top: 20, bottom: 0 }}
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
                          Total: $6.540
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
                      <LossInKitchen
                        heading={"Honeywell Mustard"}
                        belowText={"2"}
                        device={device}
                      />
                      <LossInKitchen
                        heading={"Honeywell Mustard"}
                        belowText={"3"}
                        device={device}
                      />
                      <LossInKitchen
                        heading={"Honeywell Mustard asli asd"}
                        belowText={"5"}
                        device={device}
                      />
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
                        width: 50,
                        height: 50,
                        backgroundColor: "rgba(61,213,152,0.1)",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        borderRadius: 20,
                      }}
                    >
                      <Image
                        source={greenArrowUp}
                        style={{ width: 20, height: 20, resizeMode: "contain" }}
                      />
                    </View>

                    <Text
                      style={{
                        color: chartGreenIndicator,
                        fontFamily: "openSans_bold",
                        fontSize: 16,
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
                      justifyContent: "space-between",
                      width: "80%",
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
                          width: 12,
                          height: 12,
                          borderRadius: 100,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
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
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: chartGreenIndicator,
                          width: 12,
                          height: 12,
                          borderRadius: 100,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
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
                          width: 20,
                          resizeMode: "contain",
                          tintColor: primaryColor,
                        }}
                      />
                      <Image
                        source={menuDotGray}
                        style={{
                          width: 20,
                          resizeMode: "contain",
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                      padding: 10,
                    }}
                  >
                    <PriceFluctuation
                      heading={"Beans"}
                      belowText={"$38 in the last invoice"}
                      device={device}
                      color
                    />
                    <PriceFluctuation
                      heading={"Honeywell Mustard"}
                      belowText={"$38 in the last invoice"}
                      device={device}
                      color
                    />
                    <PriceFluctuation
                      heading={"Honeywell Mustard asli asd asda"}
                      belowText={"$38 in the last invoice"}
                      device={device}
                      color
                    />
                  </View>
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
                    Total: $6.540
                  </Text>
                </View>

                <View
                  style={{ width: "100%", flexDirection: "row", marginTop: 20 }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: device === "tablet" ? "row" : "column",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                              backgroundColor: chartGreenIndicator,
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Meats
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 20,
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
                              backgroundColor: chartColor1,
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Vegetables
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginLeft: device === "tablet" ? 30 : 0,
                        marginTop: device === "tablet" ? 0 : 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                              backgroundColor: chartYellowColor,
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Fruits
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 20,
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
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Grains
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: device === "tablet" ? 30 : 0,
                        marginTop: device === "tablet" ? 0 : 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                              backgroundColor: chartPinkColor,
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Dairy
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 20,
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
                              backgroundColor: chartPurpleColor,
                              width: 12,
                              height: 12,
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: grayTextColor,
                              marginLeft: 10,
                            }}
                          >
                            Grains
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: chartGreenIndicator,
                            marginLeft: 50,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{ width: 200, marginTop: device === "tablet" ? 0 : 20 }}
              >
                <PieChart
                  style={{ height: device === "tablet" ? 100 : 200, flex: 1 }}
                  data={data}
                  innerRadius={"80%"}
                  padAngle={0}
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
                    $12.210
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
            You need to add atleast one location to view dashboard ????
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
