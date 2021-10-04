import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  primaryColor,
  primaryShade1,
  redShade1,
  redShade2,
} from "../../theme/colors";
import { RegularButton } from "../Buttons/RegularButton";
import { Text } from "../Text/Text";

export const DeleteModal = ({
  onRequestClose,
  visible,
  isLoading,
  onDelete,
  heading,
  deleteItemText,
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <Modal
      onRequestClose={isLoading ? () => null : onRequestClose}
      visible={visible}
      animationType="slide"
      transparent
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <LinearGradient
            colors={[primaryColor, primaryShade1]}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                padding: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "openSans_bold",
                  fontSize: device === "tablet" ? 25 : 20,
                }}
              >
                {heading ?? "Delete Meal?"}
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              width: "100%",
              padding: 15,
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 16,
                color: "black",
              }}
            >
              Are you sure you want to delete the {deleteItemText} This is not
              reversible.
            </Text>

            <View
              style={{
                width: "100%",
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RegularButton
                colors={["white", "white"]}
                textStyle={{ color: primaryShade1 }}
                style={{
                  borderWidth: 2,
                  borderColor: primaryShade1,
                  width: "48%",
                }}
                text={"Cancel"}
                onPress={isLoading ? () => null : onRequestClose}
              />
              <RegularButton
                colors={[redShade1, redShade2]}
                textStyle={{ color: "white" }}
                style={{
                  width: "48%",
                }}
                text={"Delete"}
                onPress={onDelete}
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
