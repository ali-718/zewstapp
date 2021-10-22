import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import bellIcon from "../../../../assets/images/bellIcon.png";
import { Text } from "../../../../components/Text/Text";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import qrcodeIcon from "../../../../assets/images/qrcodeIcon.png";
import plusBorderIcon from "../../../../assets/images/plusBorderIcon.png";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import {
  grayBorderColor,
  grayColor,
  grayMenuText,
  grayTextColor,
  lightPurple,
  lightPurpleBackground,
  lightSelectionShade,
  linearShade1,
  linearShade2,
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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setPrimaryLocationAction } from "../../../../Redux/actions/AdminActions/LocationActions";
import { LinearGradient } from "expo-linear-gradient";
import { colors, HEIGHT } from "../../../../helpers/utlils";
import moment from "moment";
import purpleCalender from "../../../../assets/images/purpleCalender.png";
import grayCalender from "../../../../assets/images/grayCalender.png";
import purpleMenuItem from "../../../../assets/images/purpleMenuItem.png";
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
import { Grid, LineChart, PieChart, YAxis } from "react-native-svg-charts";
import { Icon, Progress } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-svg-charts";

const fill = "rgb(134, 65, 244)";
const chartData = [
  50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
];

const data = [
  {
    value: 66,
    svg: {
      fill: primaryShade2,
      onPress: () => null,
    },
    key: `pie-1`,
  },
  {
    value: 30,
    svg: {
      fill: primaryShade1,
      onPress: () => null,
    },
    key: `pie-2`,
  },
  {
    value: 10,
    svg: {
      fill: progressDarkPurple,
      onPress: () => null,
    },
    key: `pie-3`,
  },
];

const PriceFluctuation = ({ heading, belowText, device, rightText, color }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: lightPurpleBackground,
      borderBottomWidth: 1,
      borderColor: grayBorderColor,
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

    <Text
      style={{
        fontSize: 20,
        fontFamily: "openSans_bold",
        color: color ? "green" : "red",
        textTransform: "uppercase",
      }}
    >
      {rightText}
    </Text>
  </View>
);
const LossInKitchen = ({ heading, belowText, device }) => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: lightPurpleBackground,
      borderBottomWidth: 1,
      borderColor: grayBorderColor,
      paddingBottom: 10,
      marginBottom: 10,
    }}
  >
    <View style={{ flex: 0.9 }}>
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

    <Text
      style={{
        fontSize: 12,
        fontFamily: "openSans_bold",
        color: "gray",
        textTransform: "uppercase",
      }}
    >
      Condiments
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
        width: device === "tablet" ? 80 : 40,
        height: device === "tablet" ? 80 : 40,
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
          color: primaryShade1,
          fontSize: device === "tablet" ? 22 : 18,
          fontFamily: "openSans_bold",
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: device === "tablet" ? 40 : 30,
          fontFamily: "openSans_bold",
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
  const [selectedTime, setSelectedTime] = useState(0);

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
      navigation.navigate("location");
      ToastSuccess("Kindly select your default location");
      return;
    }

    dispatch(setPrimaryLocationAction(JSON.parse(location), true));
  };

  // useEffect(() => {
  //   checkDefaultLocation();
  // }, []);

  const changeTime = (val) => setSelectedTime(val);

  return (
    <MainScreenContainer
      leftImage={person}
      rightImage={bellIcon}
      title={"Menu"}
    >
      <LinearGradient
        colors={[linearShade1, linearShade1, linearShade2]}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: device === "tablet" ? "90%" : "95%",
            marginBottom: 80,
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
            <Text
              style={{
                color: textColor,
                fontSize: device === "tablet" ? 42 : 28,
                fontFamily: "openSans_extraBold",
              }}
            >
              Dashboard
            </Text>
            <Text
              style={{
                color: grayMenuText,
                fontSize: device === "tablet" ? 28 : 18,
                fontFamily: "openSans_bold",
              }}
            >
              {moment().format("MMMM YYYY")}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: lightSelectionShade,
              borderRadius: 5,
              padding: 5,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: "24%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                backgroundColor:
                  selectedTime === 0 ? "white" : lightSelectionShade,
                borderRadius: 5,
              }}
              onPress={() => changeTime(0)}
            >
              <Image
                source={selectedTime === 0 ? purpleCalender : grayCalender}
                style={{
                  width: device === "tablet" ? 25 : 20,
                  height: device === "tablet" ? 25 : 20,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  color: selectedTime === 0 ? primaryShade1 : "black",
                  fontSize: device === "tablet" ? 18 : 14,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Month
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "24%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                backgroundColor:
                  selectedTime === 1 ? "white" : lightSelectionShade,
                borderRadius: 5,
              }}
              onPress={() => changeTime(1)}
            >
              <Image
                source={selectedTime === 1 ? purpleCalender : grayCalender}
                style={{
                  width: device === "tablet" ? 25 : 20,
                  height: device === "tablet" ? 25 : 20,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  color: selectedTime === 1 ? primaryShade1 : "black",
                  fontSize: device === "tablet" ? 18 : 14,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Week
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "24%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                backgroundColor:
                  selectedTime === 2 ? "white" : lightSelectionShade,
                borderRadius: 5,
              }}
              onPress={() => changeTime(2)}
            >
              <Image
                source={selectedTime === 2 ? purpleCalender : grayCalender}
                style={{
                  width: device === "tablet" ? 25 : 20,
                  height: device === "tablet" ? 25 : 20,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  color: selectedTime === 2 ? primaryShade1 : "black",
                  fontSize: device === "tablet" ? 18 : 14,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Day
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "24%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                backgroundColor:
                  selectedTime === 3 ? "white" : lightSelectionShade,
                borderRadius: 5,
              }}
              onPress={() => changeTime(3)}
            >
              <Image
                source={selectedTime === 3 ? purpleCalender : grayCalender}
                style={{
                  width: device === "tablet" ? 25 : 20,
                  height: device === "tablet" ? 25 : 20,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  color: selectedTime === 3 ? primaryShade1 : "black",
                  fontSize: device === "tablet" ? 18 : 14,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Time
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: device === "tablet" ? 40 : 20,
            }}
          >
            <IamgeItemBox
              image={purpleMenuItem}
              heading={"Menu items"}
              value={"234"}
              device={device}
            />

            <IamgeItemBox
              image={purpleOrderIcon}
              heading={"Orders"}
              value={"6651"}
              device={device}
            />

            <IamgeItemBox
              image={purpleCustomerIcon}
              heading={"Customers"}
              value={"34511"}
              device={device}
            />
          </View>

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 40 : 20 }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 30 : 20,
                fontFamily: "openSans_bold",
              }}
            >
              Order Summary
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                borderTopWidth: 2,
                borderColor: primaryShade2,
                paddingTop: 20,
              }}
            >
              <IamgeItemBox
                image={purpleTruck}
                heading={"On Delivery"}
                value={"46"}
                device={device}
              />

              <IamgeItemBox
                image={purpleBag}
                heading={"Delivered"}
                value={"88"}
                device={device}
              />

              <IamgeItemBox
                image={cancelledCalender}
                heading={"Cancelled"}
                value={"5"}
                device={device}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: device === "tablet" ? 50 : 30,
              flexDirection: "row",
            }}
          >
            <PieChart
              innerRadius={"60%"}
              style={{
                height: device === "tablet" ? 120 : 80,
                width: device === "tablet" ? 120 : 80,
              }}
              data={data}
            />

            <View
              style={{
                flex: 1,
                marginLeft: device === "tablet" ? 20 : 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Progress
                  flex={0.9}
                  colorScheme={"app"}
                  bg={progressGray}
                  value={66}
                  height={device === "tablet" ? 3 : 2}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: device === "tablet" ? 22 : 16,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    66%
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: device === "tablet" ? 18 : 14,
                      fontFamily: "openSans_semiBold",
                      marginLeft: 10,
                    }}
                  >
                    Delivered
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Progress
                  flex={0.9}
                  colorScheme={"delivery"}
                  bg={progressGray}
                  value={30}
                  height={device === "tablet" ? 3 : 2}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: device === "tablet" ? 22 : 16,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    30%
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: device === "tablet" ? 18 : 14,
                      fontFamily: "openSans_semiBold",
                      marginLeft: 10,
                    }}
                  >
                    On Delivery
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Progress
                  flex={0.9}
                  colorScheme={"cancelled"}
                  bg={progressGray}
                  value={10}
                  height={device === "tablet" ? 3 : 2}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: device === "tablet" ? 22 : 16,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    10%
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: device === "tablet" ? 18 : 14,
                      fontFamily: "openSans_semiBold",
                      marginLeft: 10,
                    }}
                  >
                    Cancelled
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: device === "tablet" ? 50 : 30,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: primaryShade3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: device === "tablet" ? 20 : 15,
                    backgroundColor: progressDarkPurple,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 25 : 20,
                      fontFamily: "openSans_extraBold",
                      color: "white",
                    }}
                  >
                    545
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 25 : 20,
                    fontFamily: "openSans_extraBold",
                    color: "white",
                    marginLeft: 20,
                  }}
                >
                  New orders
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 20 : 14,
                    color: grayColor,
                    textTransform: "uppercase",
                  }}
                >
                  Manage
                </Text>

                <Icon
                  style={{
                    color: grayColor,
                    fontSize: device === "tablet" ? 20 : 15,
                    marginLeft: 10,
                    marginRight: -10,
                  }}
                  name={"arrow-forward-ios"}
                  as={MaterialIcons}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: device === "tablet" ? 20 : 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: primaryShade3,
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent:
                  device === "tablet" ? "space-between" : "center",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flex: device === "tablet" ? 0.3 : 1,
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 25 : 20,
                    fontFamily: "openSans_extraBold",
                    color: "white",
                    marginLeft: 20,
                  }}
                >
                  Revenue
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 45 : 40,
                    fontFamily: "openSans_bold",
                    color: "white",
                    marginLeft: 20,
                  }}
                >
                  $38,451
                </Text>
              </View>

              <View
                style={{
                  flex: device === "tablet" ? 0.7 : 1,
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: device === "tablet" ? "row" : "column",
                  }}
                >
                  <View
                    style={{
                      width: device === "tablet" ? "50%" : "100%",

                      marginTop: 20,
                    }}
                  >
                    <ChartItemBox
                      image={lightPurpleChart}
                      heading={"Forecasted Sale"}
                      value={"234,33453"}
                      device={device}
                    />
                  </View>
                  <View
                    style={{
                      width: device === "tablet" ? "50%" : "100%",

                      marginTop: 20,
                    }}
                  >
                    <ChartItemBox
                      image={lightPurpleCashier}
                      heading={"Actual Sale"}
                      value={"234,33453"}
                      device={device}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flex: device === "tablet" ? 0.7 : 1,
                    flexDirection: device === "tablet" ? "row" : "column",
                  }}
                >
                  <View
                    style={{
                      width: device === "tablet" ? "50%" : "100%",

                      marginTop: 20,
                    }}
                  >
                    <ChartItemBox
                      image={lightPurplePie}
                      heading={"Forecasted Budget"}
                      value={"234,353"}
                      device={device}
                    />
                  </View>
                  <View
                    style={{
                      width: device === "tablet" ? "50%" : "100%",

                      marginTop: 20,
                    }}
                  >
                    <ChartItemBox
                      image={lightPurpleTicket}
                      heading={"Actual Spend"}
                      value={"234,453"}
                      device={device}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: device === "tablet" ? 20 : 10,
              flexDirection: device === "tablet" ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: device === "tablet" ? "48%" : "100%" }}>
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: primaryShade3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 22 : 20,
                    fontFamily: "openSans_bold",
                    color: "white",
                  }}
                >
                  Loss in Kitchen
                </Text>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("lossInKitchen")}
                >
                  <Icon
                    style={{
                      color: grayColor,
                      fontSize: device === "tablet" ? 20 : 15,
                      marginLeft: 10,
                      marginRight: -10,
                    }}
                    name={"arrow-forward-ios"}
                    as={MaterialIcons}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  padding: 10,
                  backgroundColor: lightPurpleBackground,
                }}
              >
                <LossInKitchen
                  heading={"Honeywell Mustard"}
                  belowText={"12/2018 333 ML"}
                  device={device}
                />
                <LossInKitchen
                  heading={"Honeywell Mustard"}
                  belowText={"12/2018 333 ML"}
                  device={device}
                />
                <LossInKitchen
                  heading={"Honeywell Mustard asli asd"}
                  belowText={"12/2018 333 ML"}
                  device={device}
                />
              </View>
            </View>

            <View
              style={{
                width: device === "tablet" ? "48%" : "100%",
                marginTop: device === "tablet" ? 0 : 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: primaryShade3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 5,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 22 : 20,
                    fontFamily: "openSans_bold",
                    color: "white",
                  }}
                >
                  Top 5 Price Fluctuations
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={{
                      color: grayColor,
                      fontSize: device === "tablet" ? 20 : 15,
                      marginLeft: 10,
                      marginRight: -10,
                    }}
                    name={"arrow-forward-ios"}
                    as={MaterialIcons}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  padding: 10,
                  backgroundColor: lightPurpleBackground,
                }}
              >
                <PriceFluctuation
                  heading={"Beans"}
                  belowText={"12/2018 333 ML"}
                  device={device}
                  rightText={"$54 / CS"}
                  color
                />
                <PriceFluctuation
                  heading={"Honeywell Mustard"}
                  belowText={"12/2018 333 ML"}
                  rightText={"$54 / CS"}
                  device={device}
                />
                <PriceFluctuation
                  heading={"Honeywell Mustard asli asd asda"}
                  belowText={"12/2018 333 ML"}
                  rightText={"$54 / CS"}
                  device={device}
                />
              </View>
            </View>
          </View>

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 20 : 10 }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: primaryShade3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 5,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <Text
                style={{
                  fontSize: device === "tablet" ? 22 : 20,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                Profit from Food Waste
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: grayColor,
                    fontSize: device === "tablet" ? 20 : 15,
                    marginLeft: 10,
                    marginRight: -10,
                  }}
                  name={"arrow-forward-ios"}
                  as={MaterialIcons}
                />
              </View>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: lightPurpleBackground,
                padding: 10,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                flexDirection: device === "tablet" ? "row" : "column",
              }}
            >
              <View
                style={{
                  flex: device === "tablet" ? 0.5 : 1,
                  flexDirection: device === "tablet" ? "column" : "row",
                  alignItems: device === "tablet" ? "flex-start" : "center",
                  justifyContent:
                    device === "tablet" ? "center" : "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 35 : 25,
                    fontFamily: "openSans_bold",
                    color: "black",
                  }}
                >
                  2,150
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 20 : 14,
                      fontFamily: "openSans_bold",
                      color: "gray",
                      textTransform: "uppercase",
                    }}
                  >
                    {" "}
                    Ksh
                  </Text>
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: device === "tablet" ? 10 : 0,
                  }}
                >
                  <Image
                    source={greenArrow}
                    style={{
                      width: device === "tablet" ? 25 : 20,
                      height: device === "tablet" ? 25 : 20,
                    }}
                  />

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: device === "tablet" ? "row" : "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: device === "tablet" ? 18 : 18,
                        fontFamily: "openSans_bold",
                        color: "green",
                        textTransform: "uppercase",
                      }}
                    >
                      498 (17.4)
                    </Text>
                    <Text
                      style={{
                        fontSize: device === "tablet" ? 18 : 14,
                        fontFamily: "openSans_bold",
                        color: "gray",
                      }}
                    >
                      from last week
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: device === "tablet" ? 0.5 : 1,
                  flexDirection: "row",
                }}
              >
                <YAxis
                  data={chartData}
                  style={{ marginBottom: 10 }}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fontSize: 10, fill: "grey" }}
                />
                <LineChart
                  style={{ height: 200, marginLeft: 10, flex: 1 }}
                  data={chartData}
                  svg={{ stroke: "rgb(134, 65, 244)" }}
                  contentInset={{ top: 20, bottom: 20 }}
                ></LineChart>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
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
