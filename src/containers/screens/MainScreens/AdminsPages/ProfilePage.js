import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { primaryShade1 } from "../../../../theme/colors";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";

export const ProfilePage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <MainScreenContainer title={"Profile"}>
      <HeadingBox heading={"Profile"} />
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <Input
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder={"Owner name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={phone}
            onChangeText={(val) => setPhone(val)}
            placeholder={"Owner phone"}
            keyboardType={"number-pad"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={email}
            onChangeText={(val) => setEmail(val)}
            placeholder={"Owner email"}
            keyboardType={"email-address"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Save"} />
          <View style={{ width: "100%", marginTop: 10 }}>
            <RegularButton
              colors={["white", "white"]}
              textStyle={{ color: primaryShade1 }}
              style={{ borderWidth: 2, borderColor: primaryShade1 }}
              text={"Change Password"}
              onPress={() => navigation.navigate("changePass")}
            />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
