import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { Text } from "../../../components/Text/Text";
import {
  grayTextColor,
  primaryColor,
  primaryShade3,
} from "../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { OnBoardingPage } from "./onBoardingPage";
import { emailValidator } from "../../../helpers/rules";
import validator from "validator";
import { ToastError } from "../../../helpers/Toast";
import { resetPasswordAction } from "../../../Redux/actions/AuthActions/authActions";
import { useNavigation } from "@react-navigation/core";

export const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);

  const [email, setEmail] = useState("");
  const [showError, setshowError] = useState(false);
  const [isError, setIsError] = useState({
    email: false,
  });

  const forgotPasswordClick = () => {
    setshowError(true);
    if (validator.isEmpty(email, { ignore_whitespace: true })) {
      ToastError("Kindly enter your email");
      return;
    }

    if (isError.email) return;

    dispatch(resetPasswordAction({ email, navigation }));
  };

  return (
    <AuthScreenContainer title={"Forgot Password"}>
      <View style={{ width: "100%", marginVertical: 0, marginBottom: 32 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Forgot password?
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter your email address and we will send you the reset
            instructions.
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address"}
            value={email}
            setValue={(val) => setEmail(val)}
            rule={emailValidator}
            showError={showError}
            setHighOrderError={(val) => setIsError({ ...isError, email: val })}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={forgotPasswordClick}
            text={"RESET PASSWORD"}
            style={{ borderRadius: 10, width: "100%" }}
            colors={[primaryColor, primaryColor]}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};
