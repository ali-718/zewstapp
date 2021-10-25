import React, { useEffect, useState } from "react";
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
import { emailValidator, passwordValidator } from "../../../helpers/rules";
import validator from "validator";
import { loginAction } from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../../../helpers/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { OnBoardingPage } from "./onBoardingPage";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noBack, setnoBack] = useState(false);
  const [showError, setshowError] = useState(false);
  const [isError, setIsError] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    const noBack = props.route.params?.noBack;
    const email = props.route.params?.email;

    if (noBack) {
      setnoBack(true);
    }
    if (email) {
      setEmail(email);
    }
  }, []);

  const onLogin = () => {
    setshowError(true);
    if (
      validator.isEmpty(email, { ignore_whitespace: false }) ||
      validator.isEmpty(password, { ignore_whitespace: false })
    ) {
      ToastError("please fill all fields");
      return;
    }

    if (isError.email || isError.password) return;

    setIsLoading(true);

    loginAction({ email, password })
      .then((res) => {
        dispatch({ type: USER, payload: res });
        AsyncStorage.removeItem("defaultLocation");
        AsyncStorage.setItem("refreshToken", res.token.refreshToken.token);
        AsyncStorage.setItem("user", JSON.stringify(res));
        setIsLoading(false);
      })
      .catch((e) => {
        ToastError(
          e.err?.message || "Some error occoured, please try again later"
        );
        setIsLoading(false);
      });
  };

  return (
    <AuthScreenContainer title={"Sign in"}>
      <View style={{ width: "100%", marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Welcome to Zewst
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter your Phone number or Email address for sign in. Enjoy your
            food :)
          </Text>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            setValue={(val) => setEmail(val)}
            rule={emailValidator}
            showError={showError}
            setHighOrderError={(val) => setIsError({ ...isError, email: val })}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={password}
            setValue={(val) => setPassword(val)}
            placeholder={"Password*"}
            rule={passwordValidator}
            showError={showError}
            setHighOrderError={(val) =>
              setIsError({ ...isError, password: val })
            }
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            isLoading={isLoading}
            onPress={onLogin}
            text={"Get Started"}
            style={{ borderRadius: 10, width: "100%" }}
            colors={[primaryColor, primaryColor]}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Forgot")}>
            <Text
              style={{
                fontSize: 18,
                color: primaryColor,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FullPageLoadingModall
        visible={isLoading}
        accessibilityLabel={"Singing you in"}
        text={"Singing you in..."}
      />
    </AuthScreenContainer>
  );
};
