import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { primaryShade1 } from "../../../../theme/colors";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { useSelector } from "react-redux";
import * as action from "../../../../Redux/actions/AdminActions/ResturantDetailActions";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import validator from "validator";
import { client } from "../../../../Redux/actions/client";
import PhoneInput from "react-native-phone-number-input";

export const ProfilePage = () => {
  const navigation = useNavigation();
  const phonneRef = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [unFormatted, setUnFormatted] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [renderIt, setRenderIt] = useState(false);
  const isFocused = useIsFocused();
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const user = useSelector((state) => state.auth.user.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFocused) return;

    action
      .getResturantDetail({ clientId: user.clientId })
      .then(({ client }) => {
        const {
          owner_name = "",
          email = "",
          contact_no = "",
          country = "US",
          countryCode = "",
        } = client;

        setUnFormatted(contact_no?.replace("+", "")?.replace(countryCode, ""));
        setCountryCode(country);
        setEmail(email);
        setName(owner_name);
        setPhone(contact_no);
        setRenderIt(true);
      });
  }, [isFocused]);

  const saveDetails = () => {
    if (
      validator.isEmpty(name, { ignore_whitespace: true }) ||
      validator.isEmpty(email, { ignore_whitespace: true }) ||
      validator.isEmpty(unFormatted, { ignore_whitespace: true })
    ) {
      ToastError("kindly fill all fields");
      return;
    }

    setIsLoading(true);

    const data = {
      owner_name: name,
      email,
      contact_no: phone,
      clientId: user.clientId,
      countryCode: phonneRef.current.getCallingCode(),
      country: phonneRef.current.getCountryCode(),
    };

    action
      .saveClientDetails(data, true)
      .then((data) => {
        ToastSuccess("Success", "Data saved successfully");
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const resetPassClicked = () => {
    client.post("/auth/resetPassword", {
      email: user.email,
    });
    navigation.navigate("ResetPasswordVerification", {
      email: user.email,
      title: "Change Password",
    });
  };

  if (!renderIt) return null;

  return (
    <MainScreenContainer title={"Profile"}>
      <HeadingBox heading={"Profile"} />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <Input
            value={name}
            setValue={(val) => setName(val)}
            placeholder={"Owner name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <PhoneInput
            textInputProps={{ value: unFormatted }}
            defaultCode={countryCode}
            ref={phonneRef}
            layout="first"
            onChangeText={(text) => {
              setUnFormatted(text);
            }}
            onChangeFormattedText={(text) => {
              setPhone(text);
            }}
            countryPickerProps={{ countryCode: "PK" }}
            containerStyle={{
              backgroundColor: "white",
              flex: 1,
              width: "100%",
            }}
            textContainerStyle={{ backgroundColor: "white", flex: 1 }}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={email}
            setValue={(val) => setEmail(val)}
            placeholder={"Owner email"}
            keyboardType={"email-address"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={saveDetails}
            isLoading={isLoading}
            text={"Save"}
          />
          <View style={{ width: "100%", marginTop: 10 }}>
            <RegularButton
              colors={["white", "white"]}
              textStyle={{ color: primaryShade1 }}
              style={{ borderWidth: 2, borderColor: primaryShade1 }}
              text={"Change Password"}
              onPress={resetPassClicked}
            />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
