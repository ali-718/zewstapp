import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { Text } from "../../../components/Text/Text";
import { primaryShade3 } from "../../../theme/colors";
import { emailValidator, passwordValidator } from "../../../helpers/rules";
import validator from "validator";
import { loginAction } from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../../../helpers/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { OnBoardingPage } from "./onBoardingPage";

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noBack, setnoBack] = useState(false);

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
    if (
      validator.isEmpty(email, { ignore_whitespace: false }) ||
      validator.isEmpty(password, { ignore_whitespace: false })
    ) {
      ToastError("please fill all fields");
      return;
    }

    setIsLoading(true);

    loginAction({ email, password })
      .then((res) => {
        dispatch({ type: USER, payload: res });
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

  if (device === "tablet") {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: orientation === "landscape" ? "60%" : "50%",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <OnBoardingPage inLogin />
        </View>
        <View
          style={{
            width: orientation === "landscape" ? "40%" : "50%",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <AuthScreenContainer noBack={noBack} title={"Login"}>
            <View
              style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}
            >
              <View style={{ width: "100%", marginTop: 20 }}>
                <Input
                  keyboardType={"email-address"}
                  placeholder={"Email address*"}
                  value={email}
                  setValue={(val) => setEmail(val)}
                  rule={emailValidator}
                />
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>
                <PasswordInput
                  value={password}
                  setValue={(val) => setPassword(val)}
                  placeholder={"Password*"}
                  rule={passwordValidator}
                />
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>
                <RegularButton
                  isLoading={isLoading}
                  onPress={onLogin}
                  text={"Log in"}
                  style={{ borderRadius: 50 }}
                />
              </View>

              <View
                style={{ width: "100%", marginTop: 20, alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Forgot")}
                >
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: device === "tablet" ? 20 : 18,
                      color: primaryShade3,
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </AuthScreenContainer>
        </View>
      </View>
    );
  }

  return (
    <AuthScreenContainer noBack={noBack} title={"Login"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            setValue={(val) => setEmail(val)}
            rule={emailValidator}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={password}
            setValue={(val) => setPassword(val)}
            placeholder={"Password*"}
            rule={passwordValidator}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            isLoading={isLoading}
            onPress={onLogin}
            text={"Log in"}
            style={{ borderRadius: 50 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Forgot")}>
            <Text
              style={{
                fontFamily: "openSans_bold",
                fontSize: 18,
                color: primaryShade3,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreenContainer>
  );
};
