import React, { useState } from "react";
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
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
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
          style={{ width: "100%", fontSize: 16 }}
          placeholder={isFocused ? "" : placeholder}
          placeholderTextColor={"gray"}
          onFocus={() => setIsFocused(true)}
          value={value}
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
            style={{ fontSize: 20, color: primaryColor }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
