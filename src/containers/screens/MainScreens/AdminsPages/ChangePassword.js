import React, { useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { primaryShade1 } from "../../../../theme/colors";
import { PasswordInput } from "../../../../components/Inputs/PasswordInput";

export const ChangePasswordPage = () => {
  const navigation = useNavigation();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <MainScreenContainer title={"Change Password"}>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%" }}>
            <PasswordInput
              value={currentPass}
              onChangeText={(val) => setCurrentPass(val)}
              placeholder={"Existing Password**"}
            />
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={newPass}
            onChangeText={(val) => setNewPass(val)}
            placeholder={"New Password*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <PasswordInput
            value={confirmPass}
            onChangeText={(val) => setConfirmPass(val)}
            placeholder={"Confirm Password**"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Save"} />
        </View>
      </View>
    </MainScreenContainer>
  );
};
