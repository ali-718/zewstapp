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

const TimeBox = ({ day }) => {
  const device = useSelector((state) => state.system.device);
  const [show, setShow] = useState(false);
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
          onPress={() => setShow(true)}
          style={{
            width: device === "tablet" ? "35%" : "100%",
            height: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>8:00 pm</Text>
        </TouchableOpacity>

        <Text style={{ marginVertical: device === "tablet" ? 10 : 0 }}>to</Text>

        <TouchableOpacity
          style={{
            width: device === "tablet" ? "35%" : "100%",
            height: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>8:00 pm</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(1598051730000)}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={() => null}
          />
          <RegularButton text={"Done"} onPress={() => setShow(false)} />
        </>
      )}
    </View>
  );
};

export const TimeModal = ({ onRequestClose, visible }) => {
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
            <TimeBox day={"Monday"} />
            <TimeBox day={"Tuesday"} />
          </LinearGradient>
        </View>
      </MainScreenContainer>
    </Modal>
  );
};
