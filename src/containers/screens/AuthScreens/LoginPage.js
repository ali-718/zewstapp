import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import {
  loginAction,
  loginActionOther,
} from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../../../helpers/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import purpleCashier from "../../../assets/images/purpleCashier.png";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { getEmployeeRoles } from "../../../Redux/actions/EmployeeActions/EmployeeActions";
import grayCircle from "../../../assets/images/grayCircle.png";
import checkCircle from "../../../assets/images/checkCircle.png";
import cashier from "../../../assets/images/cashier.png";
import { HEIGHT } from "../../../helpers/utlils";

export const LoginPage = (props) => {
  const dispatch = useDispatch();
  const bottomSheet = useRef();
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
  const [selectedType, setSelectedType] = useState("");
  const [roles, setRoles] = useState([]);
  const [pin, setPin] = useState("");

  useEffect(() => {
    getEmployeeRoles().then((res) => setRoles(res));

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
    if (selectedType === "OWNER") {
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
          dispatch({
            type: USER,
            payload: { ...res, user: { role: selectedType, ...res.user } },
          });
          AsyncStorage.removeItem("defaultLocation");
          AsyncStorage.setItem(
            "user",
            JSON.stringify({
              ...res,
              user: { role: selectedType, ...res.user },
            })
          );
          setIsLoading(false);
        })
        .catch((e) => {
          ToastError(
            e.err?.message || "Some error occoured, please try again later"
          );
          setIsLoading(false);
        });

      return;
    }

    if (validator.isEmpty(pin, { ignore_whitespace: true })) {
      ToastError("please fill all fields");
      return;
    }

    setIsLoading(true);

    loginActionOther({ pin })
      .then((res) => {
        dispatch({
          type: USER,
          payload: { ...res, user: { role: selectedType, ...res.user } },
        });
        AsyncStorage.removeItem("defaultLocation");
        AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...res, user: { role: selectedType, ...res.user } })
        );
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
    <AuthScreenContainer noBack={noBack} title={"Sign in"}>
      <View style={{ width: "100%", marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Please login to your account
          </Text>
          {/* <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter your Phone number or Email address for sign in. Enjoy your
            food :)
          </Text> */}
        </View>

        {selectedType.length > 0 ? (
          selectedType === "OWNER" ? (
            <>
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
              <View style={{ width: "100%", marginTop: 20 }}>
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
              </View>
            </>
          ) : (
            <Input
              keyboardType={"number-pad"}
              placeholder={"Pin"}
              value={pin}
              setValue={(val) => setPin(val)}
            />
          )
        ) : null}

        {selectedType === "" ? (
          <Input
            value={selectedType}
            setValue={(val) => null}
            keyboardType={"number-pad"}
            placeholder={"Role"}
            editable={false}
            onPress={() => bottomSheet.current.show()}
            noInput
            style={{ marginTop: 40 }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => bottomSheet.current.show()}
            style={{
              width: "100%",
              height: 80,
              borderWidth: 2,
              borderColor: "#A461D8",
              backgroundColor: "white",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              marginTop: 20,
            }}
          >
            <Image source={purpleCashier} style={{ width: 50, height: 50 }} />

            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                color: "#A461D8",
                fontFamily: "openSans_bold",
              }}
            >
              {selectedType}
            </Text>
          </TouchableOpacity>
        )}

        {selectedType.length > 0 ? (
          <View style={{ width: "100%", marginTop: 20 }}>
            <RegularButton
              isLoading={isLoading}
              onPress={onLogin}
              text={"Login"}
              style={{ borderRadius: 10, width: "100%" }}
              colors={[primaryColor, primaryColor]}
            />
          </View>
        ) : null}

        {selectedType.length > 0 ? (
          <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Forgot")}
            >
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
        ) : null}
      </View>
      <FullPageLoadingModall
        visible={isLoading}
        accessibilityLabel={"Signing you in"}
        text={"Signing you in..."}
      />

      <BottomSheet
        sheetBackgroundColor={"white"}
        hasDraggableIcon
        ref={bottomSheet}
        height={device === "tablet" ? 800 : HEIGHT / 1.2}
      >
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
            <View style={{ marginLeft: 30, marginTop: 40, marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 26,
                  color: "#363636",
                  fontFamily: "openSans_semiBold",
                }}
              >
                Select the Role
              </Text>
            </View>

            {roles.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  width: "100%",
                  height: 100,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 30,
                  backgroundColor: i % 2 === 0 ? "#FAFAFB" : "white",
                }}
                onPress={() => setSelectedType(item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={cashier} style={{ width: 50, height: 50 }} />

                  <Text
                    style={{
                      fontSize: device === "tablet" ? 21 : 18,
                      marginLeft: 20,
                    }}
                  >
                    {item}
                  </Text>
                </View>

                <Image
                  source={selectedType === item ? checkCircle : grayCircle}
                  style={{
                    width: device === "tablet" ? 50 : 30,
                    height: device === "tablet" ? 50 : 30,
                    marginRight: 30,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
    </AuthScreenContainer>
  );
};
