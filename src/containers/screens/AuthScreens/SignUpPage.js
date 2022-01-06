import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../../components/Text/Text";
import { grayTextColor, primaryColor } from "../../../theme/colors";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { signupAction } from "../../../Redux/actions/AuthActions/authActions";
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from "../../../helpers/rules";
import validator from "validator";
import { ToastError } from "../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP } from "../../../Redux/actions/AuthActions/Types";
import { OnBoardingPage } from "./onBoardingPage";
import { GoogleButton } from "../../../components/Buttons/GoogleButton";
import { useNavigation } from "@react-navigation/core";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";

export const SignUpPage = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const [selectedType, setSelectedType] = useState("");
  const [resturantName, setResturantName] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setshowError] = useState(false);
  const [isError, setIsError] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const SignUpClicked = () => {
    setshowError(true);

    if (
      validator.isEmpty(name, { ignore_whitespace: true }) ||
      validator.isEmpty(contact, { ignore_whitespace: true }) ||
      validator.isEmpty(email, { ignore_whitespace: true }) ||
      validator.isEmpty(password, { ignore_whitespace: true }) ||
      validator.isEmpty(confirmPassword, { ignore_whitespace: true })
    ) {
      ToastError("please fill all fields");
      return;
    }

    if (
      isError.name ||
      isError.email ||
      isError.phone ||
      isError.password ||
      isError.confirmPassword
    )
      return;

    setIsLoading(true);

    signupAction({
      owner_name: name,
      contact_no: contact,
      email: email,
      password: password,
    })
      .then((data) => {
        dispatch({ type: SIGNUP, payload: data.user });
        props.navigation.navigate("Verification", { phone: contact });
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
    <AuthScreenContainer title={"Register"}>
      <View style={{ width: "100%", marginVertical: 0, marginBottom: 32 }}>
        <View style={{ width: "100%" }}>
          <Text style={{ fontSize: 28, fontFamily: "openSans_bold" }}>
            Create Account
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 16,
              width: "80%",
              color: grayTextColor,
            }}
          >
            Enter your Name, Email and Password for sign up.{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ color: primaryColor }}
            >
              Already have account?
            </Text>
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={name}
            setValue={(val) => setName(val)}
            placeholder={"Full name"}
            rule={nameValidator}
            showError={showError}
            setHighOrderError={(val) => setIsError({ ...isError, name: val })}
          />
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
          <Input
            value={contact}
            setValue={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Phone number"}
            rule={phoneValidator}
            showError={showError}
            setHighOrderError={(val) => setIsError({ ...isError, phone: val })}
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
        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={confirmPassword}
            setValue={(val) => setConfirmPassword(val)}
            placeholder={"Repeat Password"}
            rule={confirmPasswordValidator}
            showError={showError}
            confirmPassword={password}
            setHighOrderError={(val) =>
              setIsError({ ...isError, confirmPassword: val })
            }
          />
        </View>

        <View style={{ width: "100%", marginTop: 32 }}>
          <RegularButton
            isLoading={isLoading}
            onPress={SignUpClicked}
            text={"GET STARTED"}
            style={{ borderRadius: 10, width: "100%" }}
            colors={[primaryColor, primaryColor]}
          />
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

        {/* <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              textAlign: "center",
              width: "80%",
            }}
          >
            Or
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <GoogleButton
            text={"CONNECT WITH GOOGLE"}
            style={{ borderRadius: 10, width: "100%" }}
          />
        </View> */}
      </View>
      <FullPageLoadingModall
        visible={isLoading}
        accessibilityLabel={"Registering you"}
        text={"Registering you..."}
      />
    </AuthScreenContainer>
  );
};
