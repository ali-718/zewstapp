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
  onPress,
  noInput,
  noPlaceHolder,
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
          borderWidth: 0.5,
          zIndex: 1,
          ...style,
          borderRadius: 10,
        }}
        activeOpacity={1}
        onPress={onPress ? onPress : () => ref.current?.focus()}
      >
        <View
          style={{
            width: "90%",
            zIndex: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            {noInput ? (
              <Text style={{ marginBottom: 5, color: "gray" }}>
                {placeholder}{" "}
                {isError && showError && (
                  <Text>
                    - <Text style={{ color: "red" }}>{errorText}</Text>
                  </Text>
                )}
              </Text>
            ) : (
              isFocused &&
              !noPlaceHolder && (
                <Text style={{ marginBottom: 5, color: "gray" }}>
                  {placeholder}{" "}
                  {isError && showError && (
                    <Text>
                      - <Text style={{ color: "red" }}>{errorText}</Text>
                    </Text>
                  )}
                </Text>
              )
            )}
          </View>

          {noInput ? (
            <Text
              style={{
                width: "100%",
                fontSize: device === "tablet" ? 16 : 16,
                ...inputStyle,
                flex: 1,
              }}
            >
              {value}
            </Text>
          ) : masked ? (
            <TextInputMask
              onBlur={() => {
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
                fontSize: device === "tablet" ? 16 : 16,
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
              autoCorrect={false}
              autoCapitalize={"words"}
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
                fontSize: device === "tablet" ? 16 : 16,
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
                fontSize: device === "tablet" ? 30 : 20,
                color: "#92929D",
                ...iconStyle,
              }}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};
