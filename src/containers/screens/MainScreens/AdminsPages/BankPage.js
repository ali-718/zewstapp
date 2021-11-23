import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { MainScreenContainer } from "../../../MainScreenContainers";
import visaLogo from "../../../../assets/images/visaLogo.png";
import mastercardLogo from "../../../../assets/images/mastercardLogo.png";
import stripeLogo from "../../../../assets/images/stripeLogo.png";

const BankPage = () => {
  const navigation = useNavigation();

  return (
    <MainScreenContainer title={"Bank Details"}>
      <HeadingBox heading={"Payments methods"} />
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "100%", marginTop: 20 }}>
            {/* <View style={{ width: "100%" }}>
              <AdminOverviewBox
                label={"Visa"}
                name={"**** 2345"}
                image={visaLogo}
                onPress={() => navigation.navigate("bankDetails")}
                noTint
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                noTint
                label={"Mastercard"}
                name={"**** 2345"}
                image={mastercardLogo}
                onPress={() => navigation.navigate("bankDetails")}
              />
            </View> */}
            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                noTint
                label={"Stripe"}
                name={""}
                image={stripeLogo}
                onPress={() => navigation.navigate("stripe")}
              />
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};

export default BankPage;
