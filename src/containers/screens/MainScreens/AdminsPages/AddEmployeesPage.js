import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { Text } from "../../../../components/Text/Text";
import { primaryColor } from "../../../../theme/colors";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import { MealItem } from "../../../../components/Meals/MealItem";

export const AddEmployeesPage = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [available, setavailable] = useState(true);

  return (
    <MainScreenContainer title={"Add Employee"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={firstName}
            onChangeText={(val) => setfirstName(val)}
            placeholder={"First name*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder={"Last Name*"}
            value={lastName}
            onChangeText={(val) => setlastName(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={contact}
            onChangeText={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Contact number*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            onChangeText={(val) => setEmail(val)}
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
            <Text style={{ color: "gray" }}>Type</Text>

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
                  Cashier
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
                  Host
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Availability*"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={() =>
              props.navigation.navigate("Verification", { phone: contact })
            }
            text={"Save"}
            style={{ borderRadius: 50 }}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
