import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
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
import MapView, { Marker } from "react-native-maps";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";

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
  const [taxRate, setTaxRate] = useState("");
  const [openMaps, setOpenMaps] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    const isData = props?.route?.params?.data;

    if (isData) {
      const {
        streetInfo = "",
        name = "",
        country = "",
        district = "",
        townCity = "",
        taxRate = "",
        longitude = "",
        latitude = "",
      } = isData;

      setCity(townCity);
      setDistrict(district);
      setCountry(country);
      setStreetName(streetInfo);
      setPlz(name);
      setIsEdit(true);
      setTaxRate(taxRate);
      setCoordinates({ longitude, latitude });
    }
  }, []);

  const onAddLocation = () => {
    if (
      validator.isEmpty(country, { ignore_whitespace: true }) ||
      validator.isEmpty(streetName, { ignore_whitespace: true }) ||
      validator.isEmpty(city, { ignore_whitespace: true }) ||
      validator.isEmpty(district, { ignore_whitespace: true }) ||
      validator.isEmpty(taxRate, { ignore_whitespace: true })
    ) {
      ToastError("Fill all fields");
      return;
    }

    if (!coordinates?.longitude || !coordinates.latitude) {
      ToastError("Select location from map");
      return;
    }

    if (isEdit) {
      const data = {
        clientId: user.clientId,
        country,
        streetInfo: streetName,
        townCity: city,
        district: district,
        locationId: props?.route?.params?.data?.locationId,
        navigation,
        taxRate,
        longitude: coordinates?.longitude,
        latitude: coordinates.latitude,
      };

      dispatch(actions.updateLocation(data));

      return;
    }

    const data = {
      clientId: user.clientId,
      country,
      streetInfo: streetName,
      townCity: city,
      district: district,
      navigation,
      taxRate,
      longitude: coordinates?.longitude,
      latitude: coordinates.latitude,
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
        <View style={{ width: "100%", marginTop: 10 }}>
          <RegularButton
            text={"Select your location"}
            onPress={() => setOpenMaps(true)}
          />
        </View>
        <View style={{ width: "100%", zIndex: 3, marginTop: 10 }}>
          <Dropdown
            selectedMenu={country}
            setMenu={setCountry}
            placeholder={"Country"}
            menus={allCountries}
            style={{ zIndex: 3 }}
          />
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
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            value={taxRate}
            setValue={(val) => setTaxRate(val)}
            placeholder={"Tax rate in %"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            editable={false}
            value={`${coordinates?.longitude ?? ""}`}
            setValue={(val) => null}
            placeholder={"Longitude"}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            editable={false}
            value={`${coordinates?.latitude ?? ""}`}
            setValue={(val) => null}
            placeholder={"Latitude"}
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

        <Modal visible={openMaps}>
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.8)",
                flex: 1,
              }}
              activeOpacity={1}
              onPress={() => setOpenMaps(false)}
            ></TouchableOpacity>
            <View
              style={{
                width: "100%",
                flex: 0.8,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  height: 60,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity onPress={() => setOpenMaps(false)}>
                  <Text style={{ fontSize: 25 }}>X</Text>
                </TouchableOpacity>
              </View>
              {console.log("lat", coordinates)}
              <MapView
                onPress={(e) => {
                  setCoordinates(e.nativeEvent.coordinate);
                  console.log("from", e.nativeEvent.coordinate);
                }}
                loadingEnabled
                showsScale
                showsCompass
                showsMyLocationButton
                showsUserLocation
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: coordinates?.latitude
                    ? parseInt(coordinates?.latitude)
                    : 37.78825,
                  longitude: coordinates?.longitude
                    ? parseInt(coordinates?.longitude)
                    : -122.4324,
                  latitudeDelta: isEdit ? 0.6922 : 0.0922,
                  longitudeDelta: isEdit ? 0.6922 : 0.0421,
                }}
                provider={"google"}
              >
                {coordinates?.longitude ? (
                  <Marker pinColor={primaryColor} coordinate={coordinates} />
                ) : null}
              </MapView>

              {coordinates.longitude ? (
                <RegularButton
                  onPress={() => setCoordinates({})}
                  style={{
                    marginBottom: 25,
                    borderColor: "red",
                    marginTop: 10,
                    width: "90%",
                    alignSelf: "center",
                  }}
                  white
                  text={"Clear"}
                  textStyle={{ color: "red" }}
                />
              ) : null}
            </View>
          </View>
        </Modal>

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
