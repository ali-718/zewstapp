import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { Text } from "../../../components/Text/Text";
import {
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

const time = 60;

export const VerificationPage = (props) => {
  const navigation = useNavigation();
  const username = useSelector((state) => state.auth.user.user);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setcode] = useState("");
  const [isResendDisabled, setResendDisabled] = useState(true);
  const [duration, setDuration] = useState(
    moment.duration(time * 1000, "milliseconds")
  );
  let timer;

  useEffect(() => {
    countDown();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const countDown = () => {
    timer = setInterval(() => {
      setDuration((prev) => {
        if (prev.asMilliseconds() - 1000 === 0) {
          clearInterval(timer);
          setResendDisabled(false);
          return moment.duration(0, "milliseconds");
        }
        return moment.duration(prev.asMilliseconds() - 1000, "milliseconds");
      });
    }, 1000);
  };

  const resetCountDown = () => {
    setResendDisabled(true);
    resendCode({ email: username })
      .then((res) => {
        setDuration(moment.duration(time * 1000, "milliseconds"));
        setIsEdit(false);
        countDown();
        ToastSuccess("Sent!", "Code sent again :)");
      })
      .catch((e) => {
        setResendDisabled(false);
        ToastError(
          e.err?.message || "Some error occoured, please try again later"
        );
      });
  };

  const onVerification = () => {
    if (code.length < 6) {
      ToastError("Kindly Fill all Fields");
      return;
    }

    setIsLoading(true);

    confirmCode({ username, code })
      .then((res) => {
        setIsLoading(false);
        ToastSuccess("Verified!", "Your email has been verified! kindly login");
        navigation.reset({
          index: 0,
          routes: [
            { name: "Login", params: { noBack: true, email: username } },
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
    <AuthScreenContainer title={"Verify"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        {/* <Input
          value={phone}
          onChangeText={(val) => setPhone(val)}
          placeholder={"Code sent on"}
          iconName={"edit"}
          iconType={FontAwesome}
          editable={isEdit}
          keyboardType={"number-pad"}
          onIconClick={() => setIsEdit(true)}
        /> */}
        <Text style={{ color: grayMenuText, fontSize: 12 }}>
          *check your email for 6 digit code
        </Text>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            height: 70,
            marginTop: 20,
          }}
        >
          <Text style={{ marginBottom: 5, color: "gray" }}>
            Verification code
          </Text>
          <TextInput
            placeholder={"_ _ _ _ _ _"}
            maxLength={6}
            keyboardType={"number-pad"}
            editable={true}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              letterSpacing: 10,
            }}
            placeholderTextColor={"black"}
            value={code}
            onChangeText={(val) => setcode(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={onVerification}
            isLoading={isLoading}
            text={"Verify"}
            style={{ borderRadius: 50 }}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: grayShade1,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: grayTextColor }}>
              Resending code in
            </Text>

            <Text style={{ fontSize: 15, color: "black", marginTop: 5 }}>
              {moment(duration.asMilliseconds()).format("mm:ss")}
            </Text>
          </View>

          <RegularButton
            text={"Re-send"}
            style={{
              width: "40%",
              height: 40,
              backgroundColor: grayShade1,
              borderColor: primaryColor,
              borderWidth: 2,
              opacity: isResendDisabled ? 0.4 : 1,
            }}
            colors={[grayShade1, grayShade1]}
            textStyle={{ fontWeight: "bold", color: primaryColor }}
            disabled={isResendDisabled}
            onPress={() => resetCountDown()}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};
