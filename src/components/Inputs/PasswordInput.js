import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import { Feather } from "@expo/vector-icons";

export const PasswordInput = ({ placeholder, setValue, rule, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecured, setIsSecured] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorText, seterrorText] = useState("");

  const OnTextChange = (val) => {
    setValue(val);

    if (!rule) return;
    rule(val)
      .then((res) => {
        setIsError(false);
        seterrorText("");
      })
      .catch((e) => {
        setIsError(true);
        seterrorText(typeof e === "object" ? e : e.error);
      });
  };

  return (
    <>
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
          borderWidth: isError ? 1 : 0,
          borderColor: "red",
        }}
      >
        <View
          style={{
            width: "90%",
          }}
        >
          {isFocused && (
            <Text style={{ marginBottom: 5, color: "gray" }}>
              {placeholder}
            </Text>
          )}

          <TextInput
            style={{ width: "100%", fontSize: 16 }}
            placeholder={isFocused ? "" : placeholder}
            placeholderTextColor={"gray"}
            onFocus={() => setIsFocused(true)}
            secureTextEntry={isSecured}
            onChangeText={(val) => OnTextChange(val)}
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
          onPress={() => setIsSecured(!isSecured)}
        >
          <Icon
            name={isSecured ? "eye-off" : "eye"}
            as={Feather}
            style={{ fontSize: 20, color: primaryColor }}
          />
        </TouchableOpacity>
      </View>
      {isError ? (
        typeof errorText === "object" ? (
          errorText.map((item, i) => (
            <Text key={i} style={{ color: "red", fontSize: 12 }}>
              *{item.error}
            </Text>
          ))
        ) : (
          <Text style={{ color: "red", fontSize: 12 }}>*{errorText}</Text>
        )
      ) : null}
    </>
  );
};
