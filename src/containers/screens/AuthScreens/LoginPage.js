import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
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
import Logo from "../../../assets/images/logo.png";
import purpleCashier from "../../../assets/images/purpleCashier.png";
import moment from "moment";
import { Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      validator.isEmpty(email, { ignore_whitespace: true }) ||
      validator.isEmpty(password, { ignore_whitespace: true })
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
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "#F3F2F2",
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          marginTop: device === "tablet" ? 50 : 50,
          alignItems: "center",
        }}
      >
        <Icon as={Ionicons} name={"chevron-back"} />

        <Text
          style={{
            color: "#000000",
            fontSize: device === "tablet" ? 24 : 18,
            marginLeft: device === "tablet" ? 30 : 10,
            fontFamily: "openSans_bold",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#F3F2F2",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 440,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            source={Logo}
            style={{ width: 410, height: 65, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: device === "tablet" ? 60 : 40,
              fontFamily: "openSans_bold",
            }}
          >
            {moment().format("h:mm a")}
          </Text>
          <Text
            style={{
              fontSize: device === "tablet" ? 27 : 18,
            }}
          >
            {moment().format("dddd,MMMM D,YYYY")}
          </Text>
          <Text
            style={{
              fontSize: device === "tablet" ? 27 : 18,
              marginTop: 10,
            }}
          >
            Sign In
          </Text>

          <View
            style={{ width: "100%", marginBottom: 40, alignItems: "center" }}
          >
            <View style={{ width: "100%", marginTop: 20 }}>
              <Input
                keyboardType={"email-address"}
                placeholder={"Email address"}
                value={email}
                setValue={(val) => setEmail(val)}
                rule={emailValidator}
                showError={showError}
                setHighOrderError={(val) =>
                  setIsError({ ...isError, email: val })
                }
              />
            </View>

            <View
              style={{ width: "100%", marginTop: 20, alignItems: "flex-end" }}
            >
              <PasswordInput
                value={password}
                setValue={(val) => setPassword(val)}
                placeholder={"Password"}
                rule={passwordValidator}
                showError={showError}
                setHighOrderError={(val) =>
                  setIsError({ ...isError, password: val })
                }
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Forgot")}
              >
                <Text style={{ color: "#868686", fontSize: 18, marginTop: 10 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
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

            <View
              style={{ width: "100%", marginTop: 20, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#868686",
                }}
              >
                Don’t have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Signup")}
                  style={{
                    fontSize: 18,
                    color: primaryColor,
                  }}
                >
                  Create
                </Text>
              </Text>
            </View>
          </View>
          <FullPageLoadingModall
            visible={isLoading}
            accessibilityLabel={"Signing you in"}
            text={"Signing you in..."}
          />
        </View>
      </View>
    </View>
  );
};
