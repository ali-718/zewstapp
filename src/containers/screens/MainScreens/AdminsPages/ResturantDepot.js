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
import {
  addBankDetailsAction,
  addResturantDepotAction,
  updateResturantDepotAction,
} from "../../../../Redux/actions/AuthActions/authActions";
import { useSelector } from "react-redux";
import { PasswordInput } from "../../../../components/Inputs/PasswordInput";

export const RestaurantDepot = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setbankBranch] = useState("");
  const [iban, setIban] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const user = useSelector((state) => state.auth.user.user);
  const [isEdit, setIsEdit] = useState(false);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );

  useEffect(() => {
    const data = props?.route?.params?.data;

    if (data) {
      const {
        accounts = [],
        locationId = "",
        clientId = "",
      } = props?.route?.params?.data;

      if (accounts.length > 0) {
        setEmail(accounts[0]?.email);
        setPassword(accounts[0]?.password);
        setIsEdit(true);
      }
    }
  }, []);

  const addBankDetails = () => {
    if (
      validator.isEmpty(email, { ignore_whitespace: true }) ||
      validator.isEmpty(password, { ignore_whitespace: true })
    ) {
      ToastError("please fill all fields");
      return;
    }

    if (!validator.isEmail(email)) {
      ToastError("Invalid email format");
      return;
    }

    setIsLoading(true);

    if (isEdit) {
      updateResturantDepotAction({
        clientId: user?.clientId,
        locationId: defaultLocation?.locationId,
        email,
        password,
        depoId: props?.route?.params?.data?.restaurantDepoId
      })
        .then(() => {
          ToastSuccess("Success!", "details updated successfully");
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(() => {
          ToastError("Some error occoured, please try again later");
          setIsLoading(false);
        });
      return;
    }

    

    addResturantDepotAction({
      clientId: user?.clientId,
      locationId: defaultLocation?.locationId,
      email,
      password,
    })
      .then(() => {
        ToastSuccess("Success!", "details added successfully");
        setIsLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        ToastError("Some error occoured, please try again later");
        setIsLoading(false);
      });
  };

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Resturant Depot"} />
      <View style={{ width: "100%", marginVertical: 20, marginBottom: 80 }}>
        <View style={{ width: "100%" }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address"}
            value={email}
            setValue={(val) => setEmail(val)}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <PasswordInput
            value={password}
            setValue={(val) => setPassword(val)}
            placeholder={"Password"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <RegularButton
            onPress={addBankDetails}
            isLoading={isLoading}
            text={isEdit ? "Update" : "Save"}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
