import React, { useState } from "react";
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

export const BankDetailsPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [available, setavailable] = useState(true);
  const [cardNumber, setCardNumber] = useState("");

  return (
    <MainScreenContainer title={"Bank Details"}>
      <HeadingBox heading={"Add a payment method"} />
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 80 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={cardNumber}
            setValue={(val) => setCardNumber(val)}
            placeholder={"Number"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={firstName}
            setValue={(val) => setfirstName(val)}
            placeholder={"First name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            placeholder={"Last Name"}
            value={lastName}
            setValue={(val) => setlastName(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={contact}
            setValue={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Phone"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email"}
            value={email}
            setValue={(val) => setEmail(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10, zIndex: 1 }}>
          <Dropdown
            selectedMenu={selectedType}
            setMenu={setSelectedType}
            placeholder={"Type"}
            menus={["Manager", "Cashier", "kitchen Staff", "Order Taker"]}
            style={{ zIndex: 3 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Availability"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <RegularButton text={"Save"} />
        </View>
      </View>
    </MainScreenContainer>
  );
};
