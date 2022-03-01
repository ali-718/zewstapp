import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { backgroundGrayColor, grayColor } from "../../theme/colors";
import { HeadingBox } from "../HeadingBox/HeadingBox";
import { Text } from "../Text/Text";
import { useSelector } from "react-redux";
import { MainScreenContainer } from "../../containers/MainScreenContainers";
import { LinearGradient } from "expo-linear-gradient";
import { RegularButton } from "../Buttons/RegularButton";
import moment from "moment";
import { DateTimeSelector } from "../DateTimeSelector/DateTimeSelector";

const TimeBox = ({ day, onchange, timedays = [] }) => {
  const device = useSelector((state) => state.system.device);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [start, setStart] = useState(
    timedays.length > 0
      ? new Date(moment(timedays[0]?.originalStart).valueOf())
      : new Date(1598051730000)
  );
  const [end, setEnd] = useState(
    timedays.length > 0
      ? new Date(moment(timedays[0]?.originalEnd).valueOf())
      : new Date(1598051730000)
  );

  return (
    <View style={{ width: "100%", marginTop: 20 }}>
      <Text style={{ fontFamily: "openSans_bold" }}>{day}</Text>

      <View
        style={{
          width: "100%",
          flexDirection: device === "tablet" ? "row" : "column",
          alignItems: "center",
          justifyContent: device === "tablet" ? "space-between" : "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setShow1(true)}
          style={{
            width: device === "tablet" ? "35%" : "100%",
            height: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{moment(start).format("h:mm a")}</Text>
        </TouchableOpacity>

        <Text style={{ marginVertical: device === "tablet" ? 10 : 0 }}>to</Text>

        <TouchableOpacity
          onPress={() => setShow2(true)}
          style={{
            width: device === "tablet" ? "35%" : "100%",
            height: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{moment(end).format("h:mm a")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimeSelector
        show={show1 || show2}
        value={show1 ? start : end}
        mode={"time"}
        is24Hour={true}
        onChange={
          show1
            ? (date) => {
                setStart(date);
                onchange(date, end);
              }
            : (date) => {
                setEnd(date);
                onchange(start, date);
              }
        }
        onPress={() => {
          setShow1(false);
          setShow2(false);
        }}
      />
    </View>
  );
};

export const TimeModal = ({ onRequestClose, visible, onchange, timedays }) => {
  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      animationType="slide"
    >
      <MainScreenContainer noHeader>
        <HeadingBox onGoBack={onRequestClose} heading={"Timings"} />
        <View style={{ width: "95%", alignItems: "center", marginBottom: 30 }}>
          <LinearGradient
            colors={[backgroundGrayColor, backgroundGrayColor]}
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
            }}
          >
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Monday")}
              day={"Monday"}
              timedays={timedays.filter((item) => item.day === "Monday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Tuesday")}
              day={"Tuesday"}
              timedays={timedays.filter((item) => item.day === "Tuesday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Wednesday")}
              day={"Wednesday"}
              timedays={timedays.filter((item) => item.day === "Wednesday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Thursday")}
              day={"Thursday"}
              timedays={timedays.filter((item) => item.day === "Thursday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Friday")}
              day={"Friday"}
              timedays={timedays.filter((item) => item.day === "Friday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Saturday")}
              day={"Saturday"}
              timedays={timedays.filter((item) => item.day === "Saturday")}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Sunday")}
              day={"Sunday"}
              timedays={timedays.filter((item) => item.day === "Sunday")}
            />
          </LinearGradient>
        </View>
      </MainScreenContainer>
    </Modal>
  );
};
