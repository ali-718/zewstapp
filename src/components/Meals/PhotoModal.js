import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { primaryShade1 } from "../../theme/colors";
import { RegularButton } from "../Buttons/RegularButton";

export const PhotoModal = ({
  onRequestClose,
  visible,
  onPickImage,
  isImageTaken,
  removeImage,
  openCamera,
}) => (
  <Modal
    onRequestClose={onRequestClose}
    visible={visible}
    animationType="slide"
    transparent
  >
    <TouchableOpacity
      style={{
        width: "100%",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
      }}
      onPress={onRequestClose}
      activeOpacity={1}
    ></TouchableOpacity>
    <View
      style={{
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 20,
      }}
    >
      <View style={{ width: "90%", alignItems: "center" }}>
        <View
          style={{
            width: 80,
            height: 8,
            backgroundColor: "lightgray",
            borderRadius: 100,
          }}
        />

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton onPress={openCamera} text={"Take Photo"} />

          <View style={{ width: "100%", marginTop: 10 }}>
            <RegularButton onPress={onPickImage} text={"Upload Photo"} />
          </View>

          {isImageTaken && (
            <View style={{ width: "100%", marginTop: 10 }}>
              <RegularButton onPress={removeImage} text={"Delete Photo"} />
            </View>
          )}

          <View style={{ width: "100%", marginTop: 10 }}>
            <RegularButton
              colors={["white", "white"]}
              textStyle={{ color: primaryShade1 }}
              style={{ borderWidth: 2, borderColor: primaryShade1 }}
              text={"Cancel"}
              onPress={onRequestClose}
            />
          </View>
        </View>
      </View>
    </View>
  </Modal>
);
