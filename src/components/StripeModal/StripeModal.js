import { View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Text } from "../Text/Text";

export const StripeModal = ({
  visible,
  handleClose,
  amount,
  orderId,
  clientId,
  locationId,
  list,
}) => {
  console.log(
    `http://localhost:3000/?amount=${amount}&orderId=${orderId}&clientId=${clientId}&locationId=${locationId}&items=${JSON.stringify(
      list
    )}`
  );
  return (
    <Modal visible={visible} onRequestClose={() => handleClose}>
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View style={{ width: "100%", flex: 0.85, backgroundColor: "white" }}>
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "center",
              height: 60,
              borderRadius: 5,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={handleClose}>
              <Text style={{ fontSize: 25 }}>X</Text>
            </TouchableOpacity>
          </View>
          <WebView
            onNavigationStateChange={(e) => {
              console.log(e);
            }}
            source={{
              uri: `http://localhost:3000/?amount=${amount}&orderId=${orderId}&clientId=${clientId}&locationId=${locationId}&items=${JSON.stringify(
                list
              )}`,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};