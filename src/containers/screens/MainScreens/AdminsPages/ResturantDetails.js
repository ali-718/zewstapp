import React, { useEffect, useRef, useState } from "react";
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
import PhoneInput from "react-native-phone-number-input";

const emp = ["Ali", "Zainab", "Umer", "Kanwal", "Zaid", "Yahya"];

export const ResturantDetails = () => {
  const navigation = useNavigation();
  const phonneRef = useRef();
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
  const [unFormatted, setUnFormatted] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [renderIt, setRenderIt] = useState(false);
  const isFocused = useIsFocused();

  const saveDetails = () => {
    if (
      validator.isEmpty(name, { ignore_whitespace: true }) ||
      validator.isEmpty(email, { ignore_whitespace: true }) ||
      validator.isEmpty(unFormatted, { ignore_whitespace: true }) ||
      validator.isEmpty(address, { ignore_whitespace: true })
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
      countryCode: phonneRef.current.getCallingCode(),
      country: phonneRef.current.getCountryCode(),
    };

    action
      .saveClientDetails(data)
      .then((data) => {
        ToastSuccess("Success", "Data saved successfully");
        setIsLoading(false);
        getResturant();
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!isFocused) return;

    getResturant();
  }, [isFocused]);

  const getResturant = () => {
    action
      .getResturantDetail({ clientId: user.clientId })
      .then(({ client }) => {
        console.log(client);
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
          country = "US",
          countryCode = "",
        } = client;

        setUnFormatted(contact_no?.replace("+", "")?.replace(countryCode, ""));
        setCountryCode(country);
        setEmail(email);
        setTimeDays(timmings);
        setAddress(address);
        setPhone(contact_no);
        setSelectedCsr(representative);
        setName(restaurantName);
        setRenderIt(true);
      });
  };

  const setTime = (start, end, day) => {
    console.log(start);
    if (timeDays.filter((item) => item.day === day).length > 0) {
      const localTime = [...timeDays];
      const index = timeDays.findIndex((item) => item.day === day);
      localTime[index] = {
        start: moment(start).format("h:mm a"),
        end: moment(end).format("h:mm a"),
        day,
        originalStart: start,
        originalEnd: end,
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

  if (!renderIt) return null;

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Restaurant details"} />
      <View
        style={{
          width: "100%",
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
          <PhoneInput
            textInputProps={{ value: unFormatted }}
            defaultCode={countryCode}
            ref={phonneRef}
            layout="first"
            onChangeText={(text) => {
              setUnFormatted(text);
            }}
            onChangeFormattedText={(text) => {
              setPhone(text);
            }}
            countryPickerProps={{ countryCode: "PK" }}
            containerStyle={{
              backgroundColor: "white",
              flex: 1,
              width: "100%",
            }}
            textContainerStyle={{ backgroundColor: "white", flex: 1 }}
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

        {/* <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Customer Service Reprenstative"}
            text={selectedCsr}
            icon={forwardIcon}
            touchable
            onPress={() => setCsrModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

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
            text={JSON.stringify(timeDays.map((item) => item.day))
              .replace(/[\[\]']+/g, "")
              .replace(/['"]+/g, "")}
            icon={forwardIcon}
            touchable
            onPress={() => setTimeModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <TimeModal
          timedays={timeDays}
          onRequestClose={() => setTimeModal(false)}
          visible={timeModal}
          onchange={(start, end, day) => setTime(start, end, day)}
        />

        {/* <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Resturant Logo"}
            text={"Square, Horizontal"}
            icon={forwardIcon}
            touchable
            onPress={() => navigation.navigate("resturantLogo")}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

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
