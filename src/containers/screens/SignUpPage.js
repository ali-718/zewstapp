import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../components/Inputs/Input";
import { AuthScreenContainer } from "../AuthScreenContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../components/Text/Text";
import { primaryColor, primaryShade1, primaryShade2 } from "../../theme/colors";
import { PasswordInput } from "../../components/Inputs/PasswordInput";
import { RoundButton } from "../../components/Buttons/RoundButton";

export const SignUpPage = () => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <AuthScreenContainer title={"Sign Up"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input placeholder={"Resturant name*"} />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder={"Resturant location*"}
            iconName={"my-location"}
            iconType={MaterialIcons}
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
          <Input placeholder={"Your full name*"} />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input keyboardType={"number-pad"} placeholder={"Contact number*"} />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput placeholder={"Password*"} />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput placeholder={"Confirm Password*"} />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RoundButton
            text={"Sign up"}
            style={{ backgroundColor: primaryColor }}
            textStyle={{ color: "white" }}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};
