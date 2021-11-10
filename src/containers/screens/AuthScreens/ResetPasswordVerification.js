import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { Text } from "../../../components/Text/Text";
import {
  gray,
  grayMenuText,
  grayShade1,
  grayTextColor,
  primaryColor,
} from "../../../theme/colors";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import moment from "moment";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import {
  confirmResetPasswordCode,
  resendCode,
} from "../../../Redux/actions/AuthActions/authActions";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { passwordValidator } from "../../../helpers/rules";
import validator from "validator";

const TextBox = ({ val, setVal, setRef, onChangeText, noLeft }) => {
  const ref = useRef();

  useEffect(() => {
    setRef(ref);
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: 40,
        borderBottomWidth: 2,
        borderBottomColor: val ? primaryColor : gray,
        backgroundColor: "white",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: noLeft ? 0 : 20,
      }}
      onPress={() => {
        ref.current.focus();
      }}
    >
      <TextInput
        selectionColor={primaryColor}
        textContentType={"oneTimeCode"}
        keyboardType={"number-pad"}
        ref={ref}
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
        }}
        value={val}
        onChangeText={(val) => {
          setVal(val);
          if (val.length > 0) {
            ref.current.blur();

            onChangeText();
          }
        }}
        maxLength={1}
      />
    </TouchableOpacity>
  );
};

export const ResetPasswordVerification = (props) => {
  const navigation = useNavigation();
  const username = props?.route?.params?.email;
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code1, setcode1] = useState("");
  const [code2, setcode2] = useState("");
  const [code3, setcode3] = useState("");
  const [code4, setcode4] = useState("");
  const [code5, setcode5] = useState("");
  const [code6, setcode6] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isError, setIsError] = useState({
    password: false,
  });

  const [refs, setrefs] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    sixth: null,
  });

  const onVerification = () => {
    setShowError(true);

    if (validator.isEmpty(password, { ignore_whitespace: false })) {
      ToastError("please fill all fields");
      return;
    }

    if (isError.password) return;

    setIsLoading(true);

    confirmResetPasswordCode({
      email: username,
      code: `${code1}${code2}${code3}${code4}${code5}${code6}`,
      newpass: password,
    })
      .then((res) => {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            { name: "Login", params: { email: username, noBack: true } },
          ],
        });
        ToastSuccess("Success", "Password changed successfully");
      })
      .catch((e) => {
        setIsLoading(false);
        ToastError(
          e?.err?.message || "Some error occoured, please try again later"
        );
      });
  };

  return (
    <AuthScreenContainer title={"Register"}>
      <View style={{ width: "100%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Verification
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter the 6-Digit code sent to you at {username}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextBox
            setRef={(val) => (refs.first = val)}
            val={code1}
            setVal={setcode1}
            onChangeText={() => refs?.second?.current?.focus()}
            noLeft
          />
          <TextBox
            setRef={(val) => (refs.second = val)}
            val={code2}
            setVal={setcode2}
            onChangeText={() => refs?.third?.current?.focus()}
          />
          <TextBox
            setRef={(val) => (refs.third = val)}
            val={code3}
            setVal={setcode3}
            onChangeText={() => refs?.fourth?.current?.focus()}
          />
          <TextBox
            setRef={(val) => (refs.fourth = val)}
            val={code4}
            setVal={setcode4}
            onChangeText={() => refs?.fifth?.current?.focus()}
          />
          <TextBox
            setRef={(val) => (refs.fifth = val)}
            val={code5}
            setVal={setcode5}
            onChangeText={() => refs?.sixth?.current?.focus()}
          />
          <TextBox
            setRef={(val) => (refs.sixth = val)}
            val={code6}
            setVal={setcode6}
            onChangeText={() => null}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={password}
            setValue={(val) => setPassword(val)}
            placeholder={"New password"}
            rule={passwordValidator}
            showError={showError}
            setHighOrderError={(val) =>
              setIsError({ ...isError, password: val })
            }
          />
        </View>

        <View style={{ width: "100%", marginTop: 32 }}>
          <RegularButton
            onPress={onVerification}
            isLoading={isLoading}
            text={"Submit"}
            style={{ borderRadius: 10, width: "100%" }}
            colors={[primaryColor, primaryColor]}
          />
        </View>
      </View>
      <FullPageLoadingModall
        visible={isLoading}
        accessibilityLabel={"updating your password"}
        text={"Updating..."}
      />
    </AuthScreenContainer>
  );
};
