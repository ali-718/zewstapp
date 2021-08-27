import React, { useState } from "react";
import { View } from "react-native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ListModal } from "../../../../components/Meals/ListModal";
import { Input } from "../../../../components/Inputs/Input";

const emp = ["Ali", "Zainab", "Umer", "Kanwal", "Zaid", "Yahya"];
const time = [
  "11:30am - 11:45pm",
  "12:10am - 12:45pm",
  "1:30am - 11:45pm",
  "2:30am - 2:45pm",
  "3:30am - 3:45pm",
  "4:30am - 4:45pm",
  "5:30am - 5:45pm",
];

export const AddLocationsPage = () => {
  const [locationName, setlocationName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [managerModal, setManagerModal] = useState(false);
  const [selectedTime, setselectedTime] = useState("");
  const [timeModal, settimeModal] = useState(false);

  return (
    <MainScreenContainer title={"Add Location"}>
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
            value={locationName}
            onChangeText={(val) => setlocationName(val)}
            placeholder={"Location Name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={phone}
            onChangeText={(val) => setphone(val)}
            placeholder={"Phone"}
            keyboardType={"number-pad"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={email}
            onChangeText={(val) => setEmail(val)}
            placeholder={"Email"}
            keyboardType={"email-address"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={address}
            onChangeText={(val) => setAddress(val)}
            placeholder={"Address"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Manager*"}
            text={selectedManager}
            icon={forwardIcon}
            touchable
            onPress={() => setManagerModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <ListModal
          onRequestClose={() => setManagerModal(false)}
          visible={managerModal}
          title={"Manager"}
          onSelect={(item) => setSelectedManager(item)}
          selected={[selectedManager]}
          list={emp}
        />

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Timings*"}
            text={selectedTime}
            icon={forwardIcon}
            touchable
            onPress={() => settimeModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <ListModal
          onRequestClose={() => settimeModal(false)}
          visible={timeModal}
          title={"Timings"}
          onSelect={(item) => setselectedTime(item)}
          selected={[selectedTime]}
          list={time}
        />

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Add"} />
        </View>
      </View>
    </MainScreenContainer>
  );
};
