import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ArrowDownIcon, Icon, Select } from "native-base";
import { grayColor, grayMenuText, primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import { useSelector } from "react-redux";
import { HEIGHT, WIDTH } from "../../helpers/utlils";

export const Dropdown = ({
  placeholder,
  iconStyle,
  textarea,
  menus,
  setMenu,
  selectedMenu,
  style,
  colors,
  noPlaceholder,
  dropDownOffset,
  styled,
  errMsg,
  innerStyle,
}) => {
  const device = useSelector((state) => state.system.device);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {Platform.OS === "android" ? (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 0,
            padding: 10,
            height: 70,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: grayColor,
            ...style,
          }}
        >
          <Select
            variant={!styled && "unstyled"}
            selectedValue={selectedMenu}
            placeholder={placeholder}
            onValueChange={(item) => {
              setMenu(item);
              setIsOpen(false);
            }}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <ArrowDownIcon size={5} />,
            }}
            width={"100%"}
          >
            {menus.map((item, i) => (
              <Select.Item key={i} label={item} value={item} />
            ))}
          </Select>
        </View>
      ) : (
        <View
          onResponderRelease={(evt) => {
            console.log("Tapped outside");
          }}
          style={{
            width: "100%",
            height: 70,
            zIndex: 10,
            ...style,
          }}
        >
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
              ...innerStyle,
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
              {!noPlaceholder && selectedMenu ? (
                <Text style={{ marginBottom: 5, color: "gray" }}>
                  {placeholder}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: device === "tablet" ? 20 : 14,
                    color: "gray",
                  }}
                >
                  {placeholder}
                </Text>
              )}
              {selectedMenu ? (
                <Text
                  style={{
                    fontSize: device === "tablet" ? 20 : 14,
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
                zIndex: 10,
                position: "absolute",
                marginTop: dropDownOffset ?? 70,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                borderRadius: 10,
                maxHeight: 200,
              }}
            >
              <ScrollView nestedScrollEnabled style={{ flex: 1 }}>
                {menus?.length > 0 ? (
                  menus.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        paddingVertical: 15,
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        setMenu(item);
                        setIsOpen(false);
                      }}
                    >
                      {colors && (
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: colors.find(
                              (val) => val.title === item
                            ).color,
                            marginRight: 10,
                            borderRadius: 100,
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: device === "tablet" ? 20 : 16,
                          color: "black",
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: device === "tablet" ? 20 : 16,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {errMsg}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      )}
      {isOpen && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsOpen(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: WIDTH,
            height: HEIGHT,
            zIndex: 9,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: WIDTH,
              height: HEIGHT,
              zIndex: 9,
            }}
          />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};
