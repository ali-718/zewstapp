import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MealItem } from "../../../../components/Meals/MealItem";
import { MainScreenContainer } from "../../../MainScreenContainers";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import { ListModal } from "../../../../components/Meals/ListModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import blackBackArrow from "../../../../assets/images/blackBackArrow.png";
import { Text } from "../../../../components/Text/Text";
import { useSelector } from "react-redux";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { TimeModal } from "../../../../components/TimeModal/TimeModal";
import moment from "moment";
import validator from "validator";
import * as action from "../../../../Redux/actions/AdminActions/ResturantDetailActions";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";

const emp = ["Ali", "Zainab", "Umer", "Kanwal", "Zaid", "Yahya"];

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
  const [timeDays, setTimeDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const isFocused = useIsFocused();
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );

  useEffect(() => {
    if (!isFocused) return;

    action
      .getResturantDetail({ clientId: user.clientId })
      .then(({ client }) => {
        const {
          owner_name = "",
          restaurantName = "",
          representative = "",
          contact_no = "",
          address = "",
          timmings = [],
          email = "",
          logo = [],
          clientId = "",
        } = client;

        setEmail(email);
        setTimeDays(timmings);
        setAddress(address);
        setPhone(contact_no);
        setSelectedCsr(representative);
        setName(restaurantName);
      });
  }, [isFocused]);

  const saveDetails = () => {
    if (
      validator.isEmpty(name, { ignore_whitespace: false }) ||
      validator.isEmpty(email, { ignore_whitespace: false }) ||
      validator.isEmpty(phone, { ignore_whitespace: false }) ||
      validator.isEmpty(address, { ignore_whitespace: false })
    ) {
      ToastError("kindly fill all fields");
      return;
    }

    setIsLoading(true);

    const data = {
      restaurantName: name,
      address: address,
      contact_no: phone,
      email: email,
      clientId: user.clientId,
      timmings: timeDays,
      representative: selectedCsr,
    };

    action
      .saveClientDetails(data)
      .then((data) => {
        console.log(data);
        ToastSuccess("Success", "Data saved successfully");
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const setTime = (start, end, day) => {
    if (timeDays.filter((item) => item.day === day).length > 0) {
      const localTime = [...timeDays];
      const index = timeDays.findIndex((item) => item.day === day);
      localTime[index] = {
        start: moment(start).format("h:mm a"),
        end: moment(end).format("h:mm a"),
        day,
      };

      setTimeDays(localTime);

      return;
    }
    const time = {
      start: moment(start).format("h:mm a"),
      end: moment(end).format("h:mm a"),
      day,
    };
    setTimeDays([...timeDays, time]);
  };

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
            setValue={(val) => setName(val)}
            placeholder={"Restaurant name"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={address}
            setValue={(val) => setAddress(val)}
            placeholder={"Main/Head Office Address"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={phone}
            setValue={(val) => setPhone(val)}
            placeholder={"Phone"}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={email}
            setValue={(val) => setEmail(val)}
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
          onchange={(start, end, day) => setTime(start, end, day)}
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
          <RegularButton
            onPress={saveDetails}
            isLoading={isLoading}
            text={"Save"}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
