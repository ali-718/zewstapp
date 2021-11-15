import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MealItem } from "../../../../components/Meals/MealItem";
import { MainScreenContainer } from "../../../MainScreenContainers";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import { ListModal } from "../../../../components/Meals/ListModal";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import blackBackArrow from "../../../../assets/images/blackBackArrow.png";
import { Text } from "../../../../components/Text/Text";
import { useSelector } from "react-redux";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { TimeModal } from "../../../../components/TimeModal/TimeModal";

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

export const ResturantDetails = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [csrModal, setCsrModal] = useState(false);
  const [selectedCsr, setSelectedCsr] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeModal, setTimeModal] = useState(false);
  const device = useSelector((state) => state.system.device);

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Restaurant details"} />
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
            placeholder={"Restaurant name"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={address}
            onChangeText={(val) => setAddress(val)}
            placeholder={"Main/Head Office Address"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={phone}
            onChangeText={(val) => setPhone(val)}
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
          <MealItem
            label={"Customer Service Reprenstative"}
            text={selectedCsr}
            icon={forwardIcon}
            touchable
            onPress={() => setCsrModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <ListModal
          onRequestClose={() => setCsrModal(false)}
          visible={csrModal}
          title={"Customer Service Reprenstative"}
          onSelect={(item) => setSelectedCsr(item)}
          selected={[selectedCsr]}
          list={emp}
        />

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Timings"}
            text={selectedTime}
            icon={forwardIcon}
            touchable
            onPress={() => setTimeModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <TimeModal
          onRequestClose={() => setTimeModal(false)}
          visible={timeModal}
        />

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Resturant Logo"}
            text={"Square, Horizontal"}
            icon={forwardIcon}
            touchable
            onPress={() => navigation.navigate("resturantLogo")}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Save"} />
        </View>
      </View>
    </MainScreenContainer>
  );
};
