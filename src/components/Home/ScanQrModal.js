import { Icon } from "native-base";
import React from "react";
import { View, Modal, TouchableOpacity, ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import qrborder from "../../assets/images/qrBorder.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export const ScanQrModal = ({ onRequestClose, visible, closeModal }) => {
  const navigation = useNavigation();
  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      animationType="slide"
      transparent
    >
      <View
        style={{ width: "100%", flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View style={{ width: "100%", padding: 10, backgroundColor: "black" }}>
          <Icon
            onPress={onRequestClose}
            as={Entypo}
            style={{ color: "white" }}
            name={"cross"}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageBackground
            source={qrborder}
            style={{
              width: "100%",
              aspectRatio: 1 / 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera
              style={{ width: "90%", flex: 0.9 }}
              type={Camera.Constants.Type.back}
              onBarCodeScanned={(val) => {
                onRequestClose();
                navigation.navigate("orderDetail", {
                  data: {
                    orderNo: "694-0879",
                  },
                });
              }}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              autoFocus={false}
            />
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};
