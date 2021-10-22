import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import personGrayIcon from "../../../../assets/images/personGrayIcon.png";
import storeIcon from "../../../../assets/images/storeIcon.png";
import locationIcon from "../../../../assets/images/locationIcon.png";
import taxIcon from "../../../../assets/images/taxIcon.png";
import multiplePeopleIcon from "../../../../assets/images/multiplePeopleIcon.png";
import bankIcon from "../../../../assets/images/bankIcon.png";
import squareLogo from "../../../../assets/images/squareLogo.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text } from "../../../../components/Text/Text";
import { FullPageLoadingModall } from "../../../../components/FullPageLoadingModall/FullPageLoadingModall";
import { ConnectSquareModal } from "../../../../components/ConnectSquareModal/ConnectSquareModal";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import { connectWithSquare } from "../../../../Redux/actions/AuthActions/authActions";

export const AdminPage = () => {
  const navigation = useNavigation();
  const employeeList = useSelector(
    (state) => state.employee.employee.employees
  );
  const hotels = useSelector((state) => state.meal.hotel.hotels);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const locationsList = useSelector((state) => state.locations.locations);
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);

  const [selected, setSelected] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [squareModal, setSquareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onConnectSquare = () => {
    setSquareModal(false);
    setIsLoading(true);

    connectWithSquare({
      clientId: user.clientId,
      squareAccessToken: accessToken,
    })
      .then(() => {
        setSquareModal(false);
        setIsLoading(false);

        ToastSuccess("Success", "Data from square migrated successfully");
      })
      .catch((e) => {
        setSquareModal(false);
        setIsLoading(false);
        ToastError(
          typeof e === "string"
            ? e
            : "Some error occoured, please try again later"
        );
      });
  };

  return (
    <MainScreenContainer leftImage={person} title={"Admin"}>
      <View style={{ width: "90%", alignItems: "center", marginBottom: 50 }}>
        {hotels.map((item, i) => (
          <View key={i} style={{ width: "100%", alignItems: "center" }}>
            <ResturantName
              name={item.name}
              selected={selected}
              setSelected={() => null}
              isAdmin
              customComponent
            />

            {selected && (
              <View style={{ width: "100%", marginTop: 20 }}>
                <View style={{ width: "100%" }}>
                  <AdminOverviewBox
                    label={"Restaurant details"}
                    name={item.name}
                    rightText={"Open"}
                    image={storeIcon}
                    onPress={() =>
                      navigation.navigate("resturantDetail", { data: item })
                    }
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    label={"Profile"}
                    name={item.owner}
                    rightText={"Owner"}
                    image={personGrayIcon}
                    onPress={() =>
                      navigation.navigate("profile", { data: item })
                    }
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    label={"Locations"}
                    name={defaultLocation.locationName ?? ""}
                    rightText={`${locationsList.length} Location`}
                    image={locationIcon}
                    onPress={() =>
                      navigation.navigate("location", { data: item })
                    }
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    label={"Tax Documents"}
                    name={"2021 Available"}
                    rightText={"6 Available"}
                    image={taxIcon}
                    onPress={() => navigation.navigate("tax", { data: item })}
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    label={"Employees"}
                    name={"Managers/Workers"}
                    rightText={`${employeeList.length} Users`}
                    image={multiplePeopleIcon}
                    onPress={() =>
                      navigation.navigate("employees", { data: item })
                    }
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    label={"Bank Details"}
                    name={"HBL Bank"}
                    rightText={"Active"}
                    image={bankIcon}
                    onPress={() =>
                      navigation.navigate("bankDetails", { data: item })
                    }
                  />
                </View>

                {/* <View
                  style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
                >
                  <TouchableOpacity
                    onPress={() => setSquareModal(true)}
                    style={{
                      width: "100%",
                      height: device === "tablet" ? 60 : 50,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      backgroundColor: "white",
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: device === "tablet" ? 25 : 18,
                        fontFamily: "openSans_bold",
                      }}
                    >
                      Connect with{" "}
                    </Text>
                    <Image
                      source={squareLogo}
                      style={{
                        width: device === "tablet" ? 100 : 80,
                        resizeMode: "contain",
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            )}
          </View>
        ))}
      </View>
      <FullPageLoadingModall visible={isLoading} />
      <ConnectSquareModal
        disabled={accessToken.trim() === ""}
        value={accessToken}
        setValue={setAccessToken}
        visible={squareModal}
        onRequestClose={() => setSquareModal(false)}
        onAction={onConnectSquare}
      />
    </MainScreenContainer>
  );
};
