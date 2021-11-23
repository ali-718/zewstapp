import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../../../../helpers/Toast";
import * as actions from "../../../../Redux/actions/PaymentActions/PaymentActions";
import { useNavigation } from "@react-navigation/core";

export const StripePage = () => {
  const user = useSelector((state) => state.auth.user.user);
  const { isLoading } = useSelector((state) => state.payment.stripe);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [stripeEmail, setstripeEmail] = useState("");
  const [publishKey, setPublishKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const addStripeMethod = () => {
    if (
      stripeEmail.trim().length === 0 ||
      publishKey.trim().length === 0 ||
      secretKey.trim().length === 0
    ) {
      ToastError("Kindly fill all fields");
      return;
    }

    dispatch(
      actions.addStripeDetails({
        clientId: user.clientId,
        stripeEmail,
        publishKey,
        secretKey,
        navigation,
      })
    );
  };

  return (
    <MainScreenContainer title={"Bank Details"}>
      <HeadingBox heading={"Add Stripe"} />
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 80 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={stripeEmail}
            setValue={(val) => setstripeEmail(val)}
            placeholder={"Stripe Email"}
            keyboardType={"email-address"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={publishKey}
            setValue={(val) => setPublishKey(val)}
            placeholder={"Publish key"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={secretKey}
            setValue={(val) => setSecretKey(val)}
            placeholder={"Secret key"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            isLoading={isLoading}
            onPress={addStripeMethod}
            text={"Save"}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
