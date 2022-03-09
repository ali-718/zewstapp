import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePickerComponent = ({ selectedDate, setSelectedDate }) => {
  const [date, setDate] = useState(selectedDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setSelectedDate(currentDate);
  };

  return (
    <View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
    </View>
  );
};
