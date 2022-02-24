import { View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY_LOCATION } from "../../../../Redux/actions/AdminActions/Types";
import stopwatchPurple from "../../../../assets/images/stopwatchPurple.png";
import blackWatchTimer from "../../../../assets/images/blackWatchTimer.png";
import purplePlay from "../../../../assets/images/purplePlay.png";
import { getEmployeeTodayTime } from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import moment from "moment";
import { Modal } from "../../../../components/Modal/Modal";
import { Text } from "../../../../components/Text/Text";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const [startTime, setStartTime] = useState("");
  const [openWatchModal, setOpenWatchModal] = useState(false);

  useEffect(() => {
    dispatch({
      type: PRIMARY_LOCATION,
      payload: {
        locationId: user?.locationId,
        location: {},
      },
    });

    getTime();
  }, [user]);

  const getTime = () =>
    getEmployeeTodayTime({ id: user?.employeeId }).then((res) => {
      if (res?.startTime) {
        setStartTime(res?.startTime);
      }
    });

  return (
    <MainScreenContainer mainHeading={"Overview"} shortDrawer isDrawer>
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
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginTop: 30,
          }}
        >
          <TouchableOpacity onPress={() => setOpenWatchModal(true)}>
            <Image source={stopwatchPurple} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </View>

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
              <Image source={purplePlay} style={{ width: 69, height: 69 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainScreenContainer>
  );
};
