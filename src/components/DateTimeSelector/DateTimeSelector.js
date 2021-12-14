/* import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal, Platform, View } from "react-native";
import { RegularButton } from "../Buttons/RegularButton";

export const DateTimeSelector = ({
  value,
  mode,
  display,
  onChange,
  show,
  onPress,
}) => {
  if (!show) {
    return <View />;
  }

  if (Platform.OS === "ios") {
    return (
      <Modal transparent visible={show}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View
            style={{ width: "100%", padding: 20, backgroundColor: "white" }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={value}
              mode={mode ?? "date"}
              is24Hour={true}
              display={display ?? "spinner"}
              onChange={onChange}
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                height: 200,
                marginBottom: 20,
              }}
            />
            <RegularButton text={"Done"} onPress={onPress} />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value}
      mode={mode ?? "date"}
      is24Hour={true}
      display={display ?? "calendar"}
      onChange={onChange}
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        height: 200,
        marginBottom: 20,
      }}
    />
  );
}; */

import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const DateTimeSelector = ({ value, mode, display, onChange, show, onPress }) => {

  const hideDatePicker = () => {
    onPress();
  };

  const handleConfirm = (date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <DateTimePickerModal
      isVisible={show}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={value}
    />
  );
};