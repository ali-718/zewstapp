import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { primaryColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const PasswordInput = ({
  placeholder,
  setValue,
  rule,
  showError,
  setHighOrderError,
  confirmPassword,
  value,
  secured = true,
  ...props
}) => {
  const device = useSelector((state) => state.system.device);
  const [isFocused, setIsFocused] = useState(false);
  const [isSecured, setIsSecured] = useState(secured ?? true);
  const [isError, setIsError] = useState(false);
  const [errorText, seterrorText] = useState("");
  const ref = useRef();

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
    rule(val, confirmPassword)
      .then((res) => {
        setIsError(false);
        seterrorText("");
        setHighOrderError(false);
      })
      .catch((e) => {
        setIsError(true);
        seterrorText(e.error);
        setHighOrderError(true);
      });
  };

  const requirements = () => {
    alert(
      `Password must contain 9 letters. \n ${" "} \n Password must contain 1 uppercase letter.  \n ${" "} \n  Password must contain 1 number. \n ${" "} \n Password must contain 1 special character.`
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderBottomWidth: isError && showError ? 1 : 0,
          borderColor: "red",
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
            {isFocused ? (
              <Text style={{ marginBottom: 5, color: "gray" }}>
                {placeholder}{" "}
                {isError && showError && (
                  <Text>
                    - <Text style={{ color: "red" }}>{errorText}</Text>
                  </Text>
                )}
              </Text>
            ) : (
              isError &&
              showError && (
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

          <TextInput
            value={value}
            onBlur={() => {
              if (value.length > 0) {
                return;
              }
              setIsFocused(false);
            }}
            selectionColor={primaryColor}
            style={{ width: "100%", fontSize: device === "tablet" ? 16 : 14 }}
            placeholder={
              isError && showError ? "" : isFocused ? "" : placeholder
            }
            placeholderTextColor={"gray"}
            onFocus={() => setIsFocused(true)}
            secureTextEntry={isSecured}
            ref={ref}
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
            style={{
              fontSize: device === "tablet" ? 30 : 20,
              color: primaryColor,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {isError && showError && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Icon
            style={{
              fontSize: 25,
              color: primaryColor,
            }}
            name={"info"}
            as={Feather}
            onPress={requirements}
          />

          <Text
            onPress={requirements}
            style={{ color: primaryColor, marginLeft: 10 }}
          >
            Password requirements
          </Text>
        </View>
      )}
    </>
  );
};
