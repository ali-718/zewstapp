import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const DateTimeSelector = ({ value, mode, onChange, show, onPress }) => {
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
      mode={mode || "date"}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={value}
    />
  );
};
