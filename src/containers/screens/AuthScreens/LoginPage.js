import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { Text } from "../../../components/Text/Text";
import { primaryShade3 } from "../../../theme/colors";

export const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthScreenContainer title={"Login"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
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
          <RegularButton text={"Log in"} style={{ borderRadius: 50 }} />
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
