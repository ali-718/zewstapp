import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../../components/Text/Text";
import { primaryColor } from "../../../theme/colors";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";

export const SignUpPage = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [resturantName, setResturantName] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthScreenContainer title={"Sign Up"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={resturantName}
            onChangeText={(val) => setResturantName(val)}
            placeholder={"Resturant name*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder={"Resturant location*"}
            iconName={"my-location"}
            iconType={MaterialIcons}
            value={location}
            onChangeText={(val) => setLocation(val)}
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
                  backgroundColor: selectedType === 0 ? primaryColor : "white",
                }}
                onPress={() => setSelectedType(0)}
              >
                <Text
                  style={{
                    color: selectedType === 0 ? "white" : primaryColor,
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
                  backgroundColor: selectedType === 1 ? primaryColor : "white",
                }}
                onPress={() => setSelectedType(1)}
              >
                <Text
                  style={{
                    color: selectedType === 1 ? "white" : primaryColor,
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
                  backgroundColor: selectedType === 2 ? primaryColor : "white",
                }}
                onPress={() => setSelectedType(2)}
              >
                <Text
                  style={{
                    color: selectedType === 2 ? "white" : primaryColor,
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
            onChangeText={(val) => setName(val)}
            placeholder={"Your full name*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={contact}
            onChangeText={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Contact number*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder={"Password*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
            placeholder={"Confirm Password*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={() =>
              props.navigation.navigate("Verification", { phone: contact })
            }
            text={"Sign up"}
            style={{ borderRadius: 50 }}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};
