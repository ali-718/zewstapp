import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { backgroundGrayColor, grayColor } from "../../theme/colors";
import { HeadingBox } from "../HeadingBox/HeadingBox";
import { Text } from "../Text/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import { MainScreenContainer } from "../../containers/MainScreenContainers";
import { LinearGradient } from "expo-linear-gradient";
import { RegularButton } from "../Buttons/RegularButton";
import moment from "moment";

const TimeBox = ({ day, onchange }) => {
  const device = useSelector((state) => state.system.device);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [start, setStart] = useState(new Date(1598051730000));
  const [end, setEnd] = useState(new Date(1598051730000));

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

      {(show1 || show2) && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={show1 ? start : end}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={
              show1
                ? (val, date) => setStart(date)
                : (val, date) => setEnd(date)
            }
          />
          <RegularButton
            text={"Done"}
            onPress={() => {
              onchange(start, end);

              setShow1(false);
              setShow2(false);
            }}
          />
        </>
      )}
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
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Wednesday")}
              day={"Wednesday"}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Thursday")}
              day={"Thursday"}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Friday")}
              day={"Friday"}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Saturday")}
              day={"Saturday"}
            />
            <TimeBox
              onchange={(start, end) => onchange(start, end, "Sunday")}
              day={"Sunday"}
            />
          </LinearGradient>
        </View>
      </MainScreenContainer>
    </Modal>
  );
};
