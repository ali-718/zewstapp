import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../../components/Text/Text";
import { primaryColor } from "../../../theme/colors";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { signupAction } from "../../../Redux/actions/AuthActions/authActions";
import {
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

export const SignUpPage = (props) => {
  const dispatch = useDispatch();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const [selectedType, setSelectedType] = useState("");
  const [resturantName, setResturantName] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SignUpClicked = () => {
    if (
      validator.isEmpty(resturantName, { ignore_whitespace: false }) ||
      validator.isEmpty(name, { ignore_whitespace: false }) ||
      validator.isEmpty(contact, { ignore_whitespace: false }) ||
      validator.isEmpty(email, { ignore_whitespace: false }) ||
      validator.isEmpty(password, { ignore_whitespace: false }) ||
      validator.isEmpty(selectedType, { ignore_whitespace: false })
    ) {
      ToastError("please fill all fields");
      return;
    }

    setIsLoading(true);

    signupAction({
      restaurant_name: resturantName,
      designation: selectedType,
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
          <AuthScreenContainer title={"Sign Up"}>
            <View
              style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}
            >
              <View style={{ width: "100%" }}>
                <Input
                  value={resturantName}
                  setValue={(val) => setResturantName(val)}
                  placeholder={"Resturant name*"}
                  rule={nameValidator}
                />
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                    height: 100,
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 18 }}>
                    Are you an owner, manager, or other
                  </Text>

                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderWidth: 1,
                        borderColor: primaryColor,
                        width: "33%",
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15,
                        backgroundColor:
                          selectedType === "Owner" ? primaryColor : "white",
                      }}
                      onPress={() => setSelectedType("Owner")}
                    >
                      <Text
                        style={{
                          color:
                            selectedType === "Owner" ? "white" : primaryColor,
                          fontFamily: "openSans_semiBold",
                          fontSize: 16,
                        }}
                      >
                        Owner
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: primaryColor,
                        width: "33%",
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15,
                        backgroundColor:
                          selectedType === "Manager" ? primaryColor : "white",
                      }}
                      onPress={() => setSelectedType("Manager")}
                    >
                      <Text
                        style={{
                          color:
                            selectedType === "Manager" ? "white" : primaryColor,
                          fontFamily: "openSans_semiBold",
                          fontSize: 16,
                        }}
                      >
                        Manager
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderWidth: 1,
                        borderColor: primaryColor,
                        width: "33%",
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15,
                        backgroundColor:
                          selectedType === "Other" ? primaryColor : "white",
                      }}
                      onPress={() => setSelectedType("Other")}
                    >
                      <Text
                        style={{
                          color:
                            selectedType === "Other" ? "white" : primaryColor,
                          fontFamily: "openSans_semiBold",
                          fontSize: 16,
                        }}
                      >
                        Other
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>
                <Input
                  value={name}
                  setValue={(val) => setName(val)}
                  placeholder={"Your full name*"}
                  rule={nameValidator}
                />
              </View>

              <View style={{ width: "100%", marginTop: 20 }}>
                <Input
                  value={contact}
                  setValue={(val) => setContact(val)}
                  keyboardType={"number-pad"}
                  placeholder={"Contact number*"}
                  rule={phoneValidator}
                />
              </View>

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
                  onPress={SignUpClicked}
                  text={"Sign up"}
                  style={{ borderRadius: 50 }}
                />
              </View>
            </View>
          </AuthScreenContainer>
        </View>
      </View>
    );
  }

  return (
    <AuthScreenContainer title={"Sign Up"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={resturantName}
            setValue={(val) => setResturantName(val)}
            placeholder={"Resturant name*"}
            rule={nameValidator}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              height: 90,
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "gray" }}>
              Are you an owner, manager, or other
            </Text>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: "33%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Owner" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Owner")}
              >
                <Text
                  style={{
                    color: selectedType === "Owner" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Owner
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: primaryColor,
                  width: "33%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Manager" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Manager")}
              >
                <Text
                  style={{
                    color: selectedType === "Manager" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Manager
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: "33%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Other" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Other")}
              >
                <Text
                  style={{
                    color: selectedType === "Other" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={name}
            setValue={(val) => setName(val)}
            placeholder={"Your full name*"}
            rule={nameValidator}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={contact}
            setValue={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Contact number*"}
            rule={phoneValidator}
          />
        </View>

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
            onPress={SignUpClicked}
            text={"Sign up"}
            style={{ borderRadius: 50 }}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};
