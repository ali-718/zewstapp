import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Text } from "../../../../components/Text/Text";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { Input } from "../../../../components/Inputs/Input";
import { Chip } from "../../../../components/Chip/Chip";
import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimeSelector } from "../../../../components/DateTimeSelector/DateTimeSelector";
import moment from "moment";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { DonateToUbfAction } from "../../../../Redux/actions/WasteActions/WasteActions";
import { useNavigation } from "@react-navigation/native";

export const WasteItemAddForDiscount = ({ ...props }) => {
  const {
    recipeTitle: name,
    recipeCategory,
    totalUnitCost,
  } = props?.route?.params?.data;
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [sellPrice, setsellPrice] = useState("");
  const [day, setDay] = useState("");
  const [showFromTime, setShowFromTime] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const donate = () => {
    setIsLoading(true);

    DonateToUbfAction({
      locationId: defaultLocation.locationId,
      mealId: props?.route?.params?.data?.mealId,
    })
      .then(() => {
        setIsLoading(false);
        navigation.pop(2);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainScreenContainer onPressRight={() => setdeleteModal(true)}>
      <HeadingBox heading={"Sell leftover food with discount"} />

      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <View style={{ width: "95%", marginVertical: "4%" }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 24 : 18,
              fontFamily: "openSans_semiBold",
            }}
          >
            Meal Customization
          </Text>
          <Text
            style={{
              fontSize: device === "tablet" ? 16 : 12,
              fontFamily: "openSans_semiBold",
              marginTop: 15,
              color: "#4D4D4D",
            }}
          >
            Pick a meal, set a discount and upload it to our UBF application.
          </Text>

          <View style={{ width: "100%", marginTop: 20 }}>
            <Input
              editable={false}
              placeholder={"Meal Title"}
              value={name}
              setValue={(val) => null}
              style={{
                width: device === "tablet" ? "60%" : "100%",
                borderColor: "#ECECF2",
                borderWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 34 : 30 }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 16,
                fontFamily: "openSans_semiBold",
              }}
            >
              Category
            </Text>

            <Chip style={{ marginTop: 20 }} selected text={recipeCategory} />
          </View>
          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 34 : 30 }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 16,
                fontFamily: "openSans_semiBold",
              }}
            >
              Discount
            </Text>

            <View
              style={{
                width: device === "tablet" ? "40%" : "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: device === "tablet" ? 24 : 10,
              }}
            >
              <Input
                prefix={
                  <Icon
                    name="dollar"
                    as={FontAwesome}
                    style={{ fontSize: 20 }}
                  />
                }
                editable={false}
                placeholder={"Initial Price"}
                value={`${totalUnitCost}`}
                setValue={(val) => null}
                style={{
                  width: device === "tablet" ? "45%" : "100%",
                  borderColor: "#ECECF2",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                }}
              />
              <Input
                prefix={
                  <Icon
                    name="dollar"
                    as={FontAwesome}
                    style={{ fontSize: 20 }}
                  />
                }
                keyboardType={"numeric"}
                editable={true}
                placeholder={"Discount Price"}
                value={sellPrice}
                setValue={(val) => setsellPrice(val)}
                style={{
                  width: device === "tablet" ? "45%" : "100%",
                  borderColor: "#ECECF2",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: device === "tablet" ? 0 : 20,
                }}
              />
            </View>
          </View>

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 34 : 30 }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 16,
                fontFamily: "openSans_semiBold",
              }}
            >
              When
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => setDay("Today")}>
                <Chip selected={day === "Today"} text={"Today"} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => setDay("Tomorrow")}
              >
                <Chip selected={day === "Tomorrow"} text={"Tomorrow"} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 34 : 30 }}
          >
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 16,
                fontFamily: "openSans_semiBold",
              }}
            >
              Time Availability
            </Text>

            <View
              style={{
                width: device === "tablet" ? "40%" : "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: device === "tablet" ? 24 : 10,
              }}
            >
              <Input
                noInput
                onPress={() => setShowFromTime(true)}
                editable={false}
                placeholder={"From"}
                value={`${moment(from).format("hh:mm")}`}
                style={{
                  width: device === "tablet" ? "45%" : "100%",
                  borderColor: "#ECECF2",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                }}
              />
              <Input
                noInput
                editable={false}
                onPress={() => setShowToTime(true)}
                editable={false}
                placeholder={"To"}
                value={`${moment(to).format("hh:mm")}`}
                style={{
                  width: device === "tablet" ? "45%" : "100%",
                  borderColor: "#ECECF2",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  marginTop: device === "tablet" ? 0 : 20,
                }}
              />
            </View>
          </View>

          <RegularButton
            isLoading={isLoading}
            onPress={donate}
            text={"Sell with discount"}
            style={{ marginTop: 30 }}
          />
        </View>
      </View>

      <DateTimeSelector
        show={showFromTime || showToTime}
        value={showFromTime ? from : to}
        mode={"time"}
        is24Hour={true}
        onChange={
          showFromTime ? (date) => setFrom(date) : (date) => setTo(date)
        }
        onPress={() => {
          setShowFromTime(false);
          setShowToTime(false);
        }}
      />
    </MainScreenContainer>
  );
};
