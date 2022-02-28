import { View, Image, TouchableOpacity, Alert, Linking } from "react-native";
import React, { useState } from "react";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_LOCATION } from "../../../../Redux/actions/AdminActions/Types";
import stopwatchPurple from "../../../../assets/images/stopwatchPurple.png";
import blackWatchTimer from "../../../../assets/images/blackWatchTimer.png";
import purplePlay from "../../../../assets/images/purplePlay.png";
import stopTime from "../../../../assets/images/stopTime.png";
import loggedArrow from "../../../../assets/images/loggedArow.png";
import shiftIcon from "../../../../assets/images/shiftIcon.png";
import daysTookOff from "../../../../assets/images/daysTookOff.png";
import calender from "../../../../assets/images/calender.png";
import {
  getEmployeeDashboardData,
  getEmployeeTodayTime,
  startEmployeeTrackTime,
  stopEmployeeTrackTime,
} from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import moment from "moment";
import { Modal } from "../../../../components/Modal/Modal";
import { Text } from "../../../../components/Text/Text";
import { Spinner } from "native-base";
import { primaryColor } from "../../../../theme/colors";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import * as Location from "expo-location";
import { distanceBetweeTwoCoords } from "../../../../helpers/utlils";
import { FullPageLoadingModall } from "../../../../components/FullPageLoadingModall/FullPageLoadingModall";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const [startTime, setStartTime] = useState("");
  const [openWatchModal, setOpenWatchModal] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);
  const [timeObject, setTimeObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    dispatch({
      type: PRIMARY_LOCATION,
      payload: {
        locationId: user?.locationId,
        location: {},
      },
    });

    getDashboarddata();

    getTime();
  }, [user]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const startTrackTime = async () => {
    setTimeLoading(true);

    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
      .then((location) => {
        const distance = distanceBetweeTwoCoords({
          lat1: location.coords.latitude,
          lon1: location.coords.longitude,
          lat2: user?.location?.latitude,
          lon2: user?.location?.longitude,
        });

        if (distance > 7) {
          console.log("distance", distance);
          alert(`you are ${(distance - 7).toFixed(2)}m away`);
          setTimeLoading(false);
          return;
        }

        console.log("distance", distance);

        startEmployeeTrackTime({
          employeeId: user?.employeeId,
          firstName: user?.firstName,
          lastName: user?.lastName,
        })
          .then(() => {
            setTimeLoading(false);
            setStartTime(moment());
            setOpenWatchModal(false);
            ToastSuccess("Success", "Time track has been started");
            getTime();
          })
          .catch(() => {
            setTimeLoading(false);
          });
      })
      .catch(() => {
        setTimeLoading(false);
        Alert.alert(
          "Error !",
          "You need to provide location permission from settings",
          [
            { text: "cancel", cancelable: true },
            { text: "open settings", onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      });
  };

  const getTime = () =>
    getEmployeeTodayTime({ id: user?.employeeId }).then((res) => {
      if (res?.startTime) {
        setTimeObject(res);
        if (res?.endTime) {
          setStartTime("");
          return;
        }
        setStartTime(res?.startTime);
      }
    });

  const getDashboarddata = () => {
    setIsLoading(true);
    getEmployeeDashboardData({ employeeId: user?.employeeId })
      .then((res) => {
        setDashboardData(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const stopTrackTime = () => {
    setTimeLoading(true);

    stopEmployeeTrackTime({
      employeeId: user?.employeeId,
      dayId: timeObject?.dayId,
      startTime: startTime,
    })
      .then(() => {
        getDashboarddata();
        setTimeLoading(false);
        setOpenWatchModal(false);
        ToastSuccess("Success", "Time track has been ended");
        getTime();
      })
      .catch(() => {
        setTimeLoading(false);
      });
  };

  return (
    <MainScreenContainer mainHeading={"Overview"} shortDrawer isDrawer>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size={"large"} color={primaryColor} />
        </View>
      ) : (
        <View
          style={{
            width: "95%",
            marginBottom: 80,
            alignItems: "center",
            marginTop: 20,
            zIndex: 1,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: device === "tablet" ? "row" : "column",
            }}
          >
            <View
              style={{
                width: device === "tablet" ? "48%" : "100%",
                padding: device === "tablet" ? 20 : 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#0184E9",
                borderRadius: 12,
                height: 150,
              }}
            >
              <Image
                source={loggedArrow}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Logged in time
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 22,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_bold",
                  }}
                >
                  5:00 pm
                </Text>
              </View>
            </View>

            <View
              style={{
                width: device === "tablet" ? "48%" : "100%",
                padding: device === "tablet" ? 20 : 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#68BAA6",
                borderRadius: 12,
                height: 150,
                marginTop: device === "tablet" ? 0 : 20,
              }}
            >
              <Image
                source={shiftIcon}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <View style={{ alignItems: "flex-end", flex: 1 }}>
                <Text
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Shift Details
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 22,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_bold",
                  }}
                >
                  {moment(
                    dashboardData?.shiftDetails?.timings?.startTime
                  ).format("h:mm a")}{" "}
                  -{" "}
                  {moment(dashboardData?.shiftDetails?.timings?.endTime).format(
                    "h:mm a"
                  )}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: device === "tablet" ? 18 : 16,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_bold",
                    flex: 1,
                    marginLeft: 10,
                  }}
                >
                  {dashboardData?.shiftDetails?.days.length > 0
                    ? dashboardData?.shiftDetails?.days.length > 1
                      ? `${dashboardData?.shiftDetails?.days.join(" - ")}`
                      : dashboardData?.shiftDetails?.days[0]
                    : ""}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: device === "tablet" ? "row" : "column",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: device === "tablet" ? "48%" : "100%",
                padding: device === "tablet" ? 20 : 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#876FFF",
                borderRadius: 12,
                height: 150,
              }}
            >
              <Image
                source={calender}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Days Worked
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 22,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_bold",
                  }}
                >
                  {dashboardData?.daysWorked} Days
                </Text>
              </View>
            </View>

            <View
              style={{
                width: device === "tablet" ? "48%" : "100%",
                padding: device === "tablet" ? 20 : 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#2936A3",
                borderRadius: 12,
                height: 150,
                marginTop: device === "tablet" ? 0 : 20,
              }}
            >
              <Image
                source={daysTookOff}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Days Took Off
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 22,
                    textTransform: "uppercase",
                    color: "white",
                    fontFamily: "openSans_bold",
                  }}
                >
                  {dashboardData?.offDays} Days
                </Text>
              </View>
            </View>
          </View>

          {dashboardData?.timeHistory?.length > 0 ? (
            <View style={{ width: "100%", marginTop: 40 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontFamily: "openSans_bold",
                }}
              >
                Timings
              </Text>

              <View
                style={{
                  width: "100%",
                  padding: 18,
                  borderRadius: 8,
                  marginTop: 20,
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View style={{ width: 100, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    {moment().format("d MMM yyyy")}
                  </Text>
                </View>
                <View
                  style={{ width: 100, alignItems: "center", marginLeft: 20 }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    In
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    {moment(dashboardData?.timeHistory[0]?.startTime).format(
                      "h:mm a"
                    )}
                  </Text>
                </View>
                <View
                  style={{ width: 100, alignItems: "center", marginLeft: 20 }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    Out
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    {moment(dashboardData?.timeHistory[0]?.endTime).format(
                      "h:mm a"
                    )}
                  </Text>
                </View>
                <View
                  style={{ width: 100, alignItems: "center", marginLeft: 20 }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    total hours
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    {dashboardData?.timeHistory[0]?.hoursWorked} Hours
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginTop: 30,
            }}
          >
            <TouchableOpacity onPress={() => setOpenWatchModal(true)}>
              <Image
                source={stopwatchPurple}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        visible={openWatchModal}
        onRequestClose={() => setOpenWatchModal(false)}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "white",
              fontFamily: "openSans_semiBold",
            }}
          >
            Timings
          </Text>

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 8,
              padding: 30,
              flexDirection: device === "tablet" ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={blackWatchTimer}
                style={{ width: 80, height: 77 }}
              />

              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 11, color: "#44444F" }}>Time</Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#000000",
                    marginTop: 12,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  {startTime === ""
                    ? "00:00:00"
                    : moment(startTime).format("h:mm:ss")}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ marginTop: device === "tablet" ? 0 : 20 }}
            >
              {timeLoading ? (
                <Spinner color={primaryColor} size={"large"} />
              ) : timeObject?.startTime && !timeObject.endTime ? (
                <TouchableOpacity onPress={stopTrackTime}>
                  <Image source={stopTime} style={{ width: 69, height: 69 }} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startTrackTime}>
                  <Image
                    source={purplePlay}
                    style={{ width: 69, height: 69 }}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainScreenContainer>
  );
};
