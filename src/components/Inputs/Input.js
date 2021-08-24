import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";

export const Input = ({
  placeholder,
  iconName,
  iconType,
  value,
  onChangeText,
  onIconClick = () => null,
  iconStyle,
  inputStyle,
  style,
  textarea,
  isEdit = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!isEdit) return;

    setIsFocused(true);
  }, [isEdit]);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        height: textarea ? 150 : 70,
        justifyContent: textarea ? "flex-start" : "center",
        alignItems: textarea ? "flex-start" : "center",
        flexDirection: "row",
        ...style,
      }}
      activeOpacity={1}
      onPress={() => ref.current?.focus()}
    >
      <View
        style={{
          width: "90%",
        }}
      >
        {isFocused && (
          <Text style={{ marginBottom: 5, color: "gray" }}>{placeholder}</Text>
        )}

        <TextInput
          ref={ref}
          style={{ width: "100%", fontSize: 16, ...inputStyle, flex: 1 }}
          placeholder={isFocused ? "" : placeholder}
          placeholderTextColor={"gray"}
          onFocus={() => setIsFocused(true)}
          value={value}
          multiline={textarea}
          onChangeText={(val) => {
            onChangeText(val);
            if (val.length === 0) {
              setIsFocused(false);
              return;
            }
            setIsFocused(true);
          }}
          {...props}
        />
      </View>
      <TouchableOpacity
        style={{
          width: "10%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onIconClick}
      >
        {iconName && (
          <Icon
            name={iconName}
            as={iconType || Ionicons}
            style={{ fontSize: 20, color: primaryColor, ...iconStyle }}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
