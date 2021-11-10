import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ListModal } from "../../../../components/Meals/ListModal";
import { Input } from "../../../../components/Inputs/Input";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from "../../../../helpers/rules";
import { ToastError } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../Redux/actions/AdminActions/LocationActions";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { allCountries } from "../../../../helpers/utlils";
import validator from "validator";

export const AddLocationsPage = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user.user);
  const isLoading = useSelector(
    (state) => state.locations.addLocation.isLoading
  );
  const [country, setCountry] = useState("");
  const [streetName, setStreetName] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const isData = props?.route?.params?.data;

    if (isData) {
      const {
        streetInfo = "",
        name = "",
        country = "",
        district = "",
        townCity = "",
      } = isData;

      setCity(townCity);
      setDistrict(district);
      setCountry(country);
      setStreetName(streetInfo);
      setPlz(name);
      setIsEdit(true);
    }
  }, []);

  const onAddLocation = () => {
    if (
      validator.isEmpty(country, { ignore_whitespace: false }) ||
      validator.isEmpty(streetName, { ignore_whitespace: false }) ||
      validator.isEmpty(plz, { ignore_whitespace: false }) ||
      validator.isEmpty(city, { ignore_whitespace: false }) ||
      validator.isEmpty(district, { ignore_whitespace: false })
    ) {
      ToastError("Fill all fields");
      return;
    }

    if (isEdit) {
      const data = {
        clientId: user.clientId,
        country,
        streetInfo: streetName,
        name: plz,
        townCity: city,
        district: district,
        locationId: props?.route?.params?.data?.locationId,
      };

      dispatch(actions.updateLocation(data));

      return;
    }

    const data = {
      clientId: user.clientId,
      country,
      streetInfo: streetName,
      name: plz,
      townCity: city,
      district: district,
      navigation,
    };

    dispatch(actions.AddNewLocation(data));
  };

  return (
    <MainScreenContainer title={"Add Location"}>
      <HeadingBox heading={isEdit ? "Edit location" : "Add location"} />
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%", zIndex: 3 }}>
          <Dropdown
            selectedMenu={country}
            setMenu={setCountry}
            placeholder={"Country"}
            menus={allCountries}
            style={{ zIndex: 3 }}
          />
          {/* <Input
            value={locationName}
            setValue={(val) => setlocationName(val)}
            placeholder={"Location Name*"}
            rule={nameValidator}
          /> */}
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={streetName}
            setValue={(val) => setStreetName(val)}
            placeholder={"Street name and number"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={plz}
            setValue={(val) => setPlz(val)}
            placeholder={"PLZ"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={city}
            setValue={(val) => setCity(val)}
            placeholder={"Town/City"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={district}
            setValue={(val) => setDistrict(val)}
            placeholder={"District"}
          />
        </View>
        {/* <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={phone}
            setValue={(val) => setphone(val)}
            placeholder={"Phone*"}
            keyboardType={"number-pad"}
            rule={phoneValidator}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={email}
            setValue={(val) => setEmail(val)}
            placeholder={"Email*"}
            keyboardType={"email-address"}
            rule={emailValidator}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={address}
            setValue={(val) => setAddress(val)}
            placeholder={"Address*"}
            rule={nameValidator}
          />
        </View> */}
        {/* {!isMenu && (
          <View style={{ width: "100%", marginTop: 10 }}>
            <MealItem
              label={"Manager"}
              text={selectedManager}
              icon={forwardIcon}
              touchable
              onPress={() => setManagerModal(true)}
              iconStyle={{ width: 20, height: 20 }}
            />
          </View>
        )} */}

        {/* <ListModal
          onRequestClose={() => setManagerModal(false)}
          visible={managerModal}
          title={"Manager"}
          onSelect={(item) => setSelectedManager(item)}
          selected={[selectedManager]}
          list={emp}
        /> */}

        {/* {!isMenu && (
          <View style={{ width: "100%", marginTop: 10 }}>
            <MealItem
              label={"Timings"}
              text={selectedTime}
              icon={forwardIcon}
              touchable
              onPress={() => settimeModal(true)}
              iconStyle={{ width: 20, height: 20 }}
            />
          </View>
        )} */}
        {/* 
        <ListModal
          onRequestClose={() => settimeModal(false)}
          visible={timeModal}
          title={"Timings"}
          onSelect={(item) => setselectedTime(item)}
          selected={[selectedTime]}
          list={time}
        /> */}

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={onAddLocation}
            isLoading={isLoading}
            text={isEdit ? "Update" : "Add"}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
