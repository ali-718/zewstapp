import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { MealItem } from "../../../../components/Meals/MealItem";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import validator from "validator";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import { addBankDetailsAction } from "../../../../Redux/actions/AuthActions/authActions";
import { useSelector } from "react-redux";
import { fetchBankDetails } from "../../../../Redux/actions/PaymentActions/PaymentActions";

export const BankDetailsPage = () => {
  const [bankName, setBankName] = useState("");
  const [bankBranch, setbankBranch] = useState("");
  const [iban, setIban] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const user = useSelector((state) => state.auth.user.user);

  useEffect(() => {
    fetchBankDetails({ clientId: user?.clientId }).then((res) => {
      const {
        bankName = "",
        bankBranch = "",
        accountTitle = "",
        iban = "",
      } = res;

      setBankName(bankName);
      setbankBranch(bankBranch);
      setAccountTitle(accountTitle);
      setIban(iban);
    });
  }, []);

  const addBankDetails = () => {
    if (
      validator.isEmpty(bankName, { ignore_whitespace: true }) ||
      validator.isEmpty(bankBranch, { ignore_whitespace: true }) ||
      validator.isEmpty(iban, { ignore_whitespace: true }) ||
      validator.isEmpty(accountTitle, { ignore_whitespace: true })
    ) {
      ToastError("Kindly fill all fields!");
      return;
    }

    setIsLoading(true);
    addBankDetailsAction({
      clientId: user?.clientId,
      bankName,
      bankBranch,
      iban,
      accountTitle,
    })
      .then(() => {
        ToastSuccess("Success!", "Bank detail added successfully");
        setIsLoading(false);
      })
      .catch(() => {
        ToastError("Some error occoured, please try again later");
        setIsLoading(false);
      });
  };

  return (
    <MainScreenContainer title={"Bank Details"}>
      <HeadingBox heading={"Add Bank Details"} />
      <View style={{ width: "100%", marginVertical: 20, marginBottom: 80 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={bankName}
            setValue={(val) => setBankName(val)}
            placeholder={"Bank Name"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={bankBranch}
            setValue={(val) => setbankBranch(val)}
            placeholder={"Bank Branch"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={iban}
            setValue={(val) => setIban(val)}
            placeholder={"IBAN"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={accountTitle}
            setValue={(val) => setAccountTitle(val)}
            placeholder={"Account Title"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <RegularButton
            onPress={addBankDetails}
            isLoading={isLoading}
            text={"Save"}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
