import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { grayColor, grayMenuText, primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import { useSelector } from "react-redux";

export const Dropdown = ({
  placeholder,
  iconStyle,
  textarea,
  menus,
  setMenu,
  selectedMenu,
  style,
}) => {
  const device = useSelector((state) => state.system.device);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View style={{ width: "100%", height: 70, zIndex: 1, ...style }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 0,
            padding: 10,
            height: 70,
            justifyContent: textarea ? "flex-start" : "center",
            alignItems: textarea ? "flex-start" : "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: grayColor,
            ...style,
          }}
          activeOpacity={1}
          onPress={() => {
            setIsFocused(!isFocused);
            setIsOpen(!isOpen);
          }}
        >
          <View
            style={{
              width: "90%",
            }}
          >
            <Text style={{ marginBottom: 5, color: "gray" }}>
              {placeholder}
            </Text>
            {selectedMenu ? (
              <Text
                style={{
                  fontSize: device === "tablet" ? 20 : 16,
                  color: "black",
                }}
              >
                {selectedMenu}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              width: "10%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setIsFocused(!isFocused);
              setIsOpen(!isOpen);
            }}
          >
            <Icon
              name={"keyboard-arrow-down"}
              as={MaterialIcons}
              style={{
                fontSize: device === "tablet" ? 30 : 20,
                color: primaryColor,
                ...iconStyle,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {isOpen && (
          <View
            style={{
              width: "100%",
              zIndex: 1,
              position: "absolute",
              marginTop: 70,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              borderRadius: 10,
            }}
          >
            {menus.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  paddingVertical: 15,
                }}
                onPress={() => {
                  setMenu(item);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 20 : 16,
                    color: "black",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </>
  );
};
