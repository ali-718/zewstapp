import React, { useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import personGrayIcon from "../../../../assets/images/personGrayIcon.png";
import storeIcon from "../../../../assets/images/storeIcon.png";
import locationIcon from "../../../../assets/images/locationIcon.png";
import taxIcon from "../../../../assets/images/taxIcon.png";
import multiplePeopleIcon from "../../../../assets/images/multiplePeopleIcon.png";
import bankIcon from "../../../../assets/images/bankIcon.png";
import readerIcon from "../../../../assets/images/reader-image-small.png";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text } from "../../../../components/Text/Text";
import { FullPageLoadingModall } from "../../../../components/FullPageLoadingModall/FullPageLoadingModall";
import { ConnectSquareModal } from "../../../../components/ConnectSquareModal/ConnectSquareModal";
import { ToastError, ToastSuccess } from "../../../../helpers/Toast";
import { connectWithSquare } from "../../../../Redux/actions/AuthActions/authActions";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { StripeModal } from "../../../../components/StripeModal/StripeModal";

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

  const item = hotels[0];

  return (
    <MainScreenContainer shortDrawer isDrawer>
      <HeadingBox noBack heading={"Admin panel"} />

      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "100%", marginTop: 20 }}>
            <View style={{ width: "100%" }}>
              <AdminOverviewBox
                label={"Restaurant details"}
                name={item.name}
                image={storeIcon}
                onPress={() =>
                  navigation.navigate("resturantDetail", { data: item })
                }
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                label={"Profile"}
                name={user.owner_name}
                image={personGrayIcon}
                onPress={() => navigation.navigate("profile", { data: item })}
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                label={"Locations"}
                name={defaultLocation.locationName ?? ""}
                image={locationIcon}
                onPress={() => navigation.navigate("location", { data: item })}
              />
            </View>

            <View style={{ width: "100%", marginTop: 10, opacity: 0.3 }}>
              <AdminOverviewBox
                activeOpacity={1}
                label={"Tax Invoices UBF"}
                name={"2021 Available"}
                image={taxIcon}
                // onPress={() => navigation.navigate("tax", { data: item })}
                onPress={() => null}
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                label={"Employees"}
                name={"Managers/Workers"}
                image={multiplePeopleIcon}
                onPress={() => navigation.navigate("employees", { data: item })}
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                label={"Payment methods"}
                name={"Stripe"}
                image={bankIcon}
                onPress={() => navigation.navigate("bankPage")}
              />
            </View>
            {/* <View style={{ width: "100%", marginTop: 10 }}>
              <AdminOverviewBox
                noTint
                label={"Stripe Reader"}
                name={"Stripe"}
                image={readerIcon}
                onPress={() => navigation.navigate("stripeReaders")}
              />
            </View> */}

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
        </View>
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
