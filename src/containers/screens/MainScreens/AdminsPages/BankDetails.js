import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

export const BankDetailsPage = () => {
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [iban, setIban] = useState("");
  const [accountTitle, setaccountTitle] = useState("");

  return (
    <MainScreenContainer title={"Bank Details"}>
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
            value={bankName}
            onChangeText={(val) => setBankName(val)}
            placeholder={"Bank Name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={branchName}
            onChangeText={(val) => setBranchName(val)}
            placeholder={"Bank Branch"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={iban}
            onChangeText={(val) => setIban(val)}
            placeholder={"IBAN"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={accountTitle}
            onChangeText={(val) => setaccountTitle(val)}
            placeholder={"Account Title"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Edit"} />
        </View>
      </View>
    </MainScreenContainer>
  );
};
