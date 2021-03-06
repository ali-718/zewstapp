import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import {
  grayMenuText,
  inputBorderColor,
  primaryColor,
} from "../../theme/colors";
import { Text } from "../Text/Text";
import { useSelector } from "react-redux";
import { TextInputMask } from "react-native-masked-text";

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
  rule,
  setValue,
  masked,
  maskType,
  maskFormat,
  showError,
  setHighOrderError,
  ...props
}) => {
  const device = useSelector((state) => state.system.device);
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, seterrorText] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (!isEdit) return;

    setIsFocused(true);
  }, [isEdit]);

  useEffect(() => {
    if (value.length === 0) return;
    setIsFocused(true);
  }, [value]);

  useEffect(() => {
    if (!showError) return;
    ruleChecker(value);
  }, [showError]);

  const OnTextChange = (val) => {
    setValue(val);
    ruleChecker(val);
  };

  const ruleChecker = (val) => {
    if (!rule) return;
    rule(val)
      .then(() => {
        setIsError(false);
        seterrorText("");
        setHighOrderError(false);
      })
      .catch((e) => {
        setIsError(true);
        seterrorText(typeof e === "array" ? e : e.error);
        setHighOrderError(true);
      });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 10,
          height: textarea ? 150 : 70,
          justifyContent: textarea ? "flex-start" : "center",
          alignItems: textarea ? "flex-start" : "center",
          flexDirection: "row",
          borderBottomWidth: isError && showError ? 1 : 0,
          borderColor: inputBorderColor,
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
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            {isFocused && (
              <Text style={{ marginBottom: 5, color: "gray" }}>
                {placeholder}{" "}
                {isError && showError && (
                  <Text>
                    - <Text style={{ color: "red" }}>{errorText}</Text>
                  </Text>
                )}
              </Text>
            )}
          </View>

          {masked ? (
            <TextInputMask
              onBlur={() => {
                console.log("ok");
                if (value.length > 0) {
                  return;
                }
                setIsFocused(false);
              }}
              type={maskType}
              options={{
                format: maskFormat,
              }}
              ref={ref}
              style={{
                width: "100%",
                fontSize: device === "tablet" ? 20 : 16,
                ...inputStyle,
                flex: 1,
              }}
              placeholder={isFocused ? maskFormat : placeholder}
              placeholderTextColor={"gray"}
              onFocus={() => setIsFocused(true)}
              value={value}
              multiline={textarea}
              onChangeText={(val) => {
                OnTextChange(val);
                if (val.length === 0) {
                  setIsFocused(false);
                  return;
                }
                setIsFocused(true);
              }}
              selectionColor={primaryColor}
              autoCapitalize={"none"}
              {...props}
            />
          ) : (
            <TextInput
              selectionColor={primaryColor}
              onBlur={() => {
                if (value.length > 0) {
                  return;
                }
                setIsFocused(false);
              }}
              ref={ref}
              style={{
                width: "100%",
                fontSize: device === "tablet" ? 20 : 16,
                ...inputStyle,
                flex: 1,
              }}
              placeholder={isFocused ? "" : placeholder}
              placeholderTextColor={"gray"}
              onFocus={() => setIsFocused(true)}
              value={value}
              multiline={textarea}
              onChangeText={(val) => {
                OnTextChange(val);
                if (val.length === 0) {
                  setIsFocused(false);
                  return;
                }
                setIsFocused(true);
              }}
              autoCapitalize={"none"}
              {...props}
            />
          )}
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
              style={{
                fontSize: device === "tablet" ? 40 : 20,
                color: primaryColor,
                ...iconStyle,
              }}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};
