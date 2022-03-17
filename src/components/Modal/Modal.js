import { View, Modal as ModalComponent, TouchableOpacity } from "react-native";
import React from "react";

export const Modal = ({
  visible,
  onRequestClose,
  transparent = true,
  ...props
}) => {
  return (
    <ModalComponent
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={transparent}
      animationType="slide"
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            flex: 1,
          }}
          activeOpacity={1}
          onPress={onRequestClose}
        ></TouchableOpacity>

        {props.children}
      </View>
    </ModalComponent>
  );
};
