import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimeSelector } from "../DateTimeSelector/DateTimeSelector";
import { Text } from "../Text/Text";
import moment from "moment";

export const DatePickerComponent = ({ selectedDate, setSelectedDate }) => {
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState(selectedDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setSelectedDate(currentDate);
  };

  return (
    <View style={{width:200}}>
      {Platform.OS === "android" ? (
        <>
        <TouchableOpacity style={{paddingHorizontal:10,padding:5, backgroundColor:'#ededed', width: 120, borderRadius:8}} onPress={() => setShowModal(true)}>
          <Text>{moment(selectedDate).format("MMM DD, YYYY")}</Text>
        </TouchableOpacity>
        <DateTimeSelector
          show={showModal}
          value={date}
          is24Hour={true}
          onChange={(date) => onChange("", date)}
          onPress={() => {
            setShowModal(false);
          }}
        />
        </>
      ) : (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};
