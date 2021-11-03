import React from "react";
import { View, Text, Modal, SafeAreaView } from "react-native";
import { Spinner } from "native-base";
import { primaryColor } from "../../theme/colors";
import { useSelector } from "react-redux";

export const FullPageLoadingModall = ({
  visible,
  accessibilityLabel,
  text,
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <Modal
      transparent
      onRequestClose={() => null}
      visible={visible}
      animationType="slide"
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
          justifyContent: "center",
        }}
      >
        <Spinner
          accessibilityLabel={
            accessibilityLabel ??
            "Kindly do not close the app we are migrating data from square"
          }
          size="large"
          color={primaryColor}
        />

        <Text
          style={{
            fontSize: device === "tablet" ? 25 : 18,
            marginTop: 20,
            width: "90%",
            textAlign: "center",
          }}
        >
          {text ??
            "Kindly do not close the app we are migrating data from square"}
        </Text>
      </View>
    </Modal>
  );
};
