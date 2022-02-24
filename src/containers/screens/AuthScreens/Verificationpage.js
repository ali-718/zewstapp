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
  confirmCode,
  resendCode,
} from "../../../Redux/actions/AuthActions/authActions";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";

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

export const VerificationPage = (props) => {
  const navigation = useNavigation();
  const username = useSelector((state) => state.auth.user.user);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code1, setcode1] = useState("");
  const [code2, setcode2] = useState("");
  const [code3, setcode3] = useState("");
  const [code4, setcode4] = useState("");
  const [code5, setcode5] = useState("");
  const [code6, setcode6] = useState("");

  const [refs, setrefs] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    sixth: null,
  });

  const resetCountDown = () => {
    resendCode({ email: username })
      .then((res) => {
        ToastSuccess("Sent!", "Code sent again :)");
      })
      .catch((e) => {
        ToastError(
          e.err?.message || "Some error occoured, please try again later"
        );
      });
  };

  const onVerification = () => {
    setIsLoading(true);

    confirmCode({
      username,
      code: `${code1}${code2}${code3}${code4}`,
    })
      .then((res) => {
        setIsLoading(false);
        ToastSuccess("Verified!", "Your email has been verified! kindly login");
        navigation.reset({
          index: 0,
          routes: [
            { name: "Login", params: { email: username, noBack: true } },
          ],
        });
      })
      .catch((e) => {
        setIsLoading(false);
        ToastError(
          e.err?.message || "Some error occoured, please try again later"
        );
      });
  };

  return (
    <AuthScreenContainer title={"Register"}>
      <View style={{ width: "100%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Verify your phone number
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter the 6-Digit code sent to you at +{props?.route?.params?.phone}
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
            onChangeText={() => null}
          />
        </View>

        <View style={{ width: "100%", marginTop: 32 }}>
          <RegularButton
            onPress={onVerification}
            isLoading={isLoading}
            text={"Get Started"}
            style={{ borderRadius: 10, width: "100%" }}
            colors={[primaryColor, primaryColor]}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              fontFamily: "openSans_bold",
              textAlign: "center",
            }}
          >
            Didn’t receive code?{" "}
            <Text onPress={resetCountDown} style={{ color: primaryColor }}>
              Resend Again.
            </Text>
          </Text>
        </View>
        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: grayTextColor,
              textAlign: "center",
              width: "80%",
            }}
          >
            By Signing up you agree to our Terms Conditions & Privacy Policy.
          </Text>
        </View>
      </View>
      <FullPageLoadingModall
        visible={isLoading}
        accessibilityLabel={"Registering you"}
        text={"Registering you..."}
      />
    </AuthScreenContainer>
  );
};
