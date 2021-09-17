import React, { useState } from "react";
import { View, Text } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import personGrayIcon from "../../../../assets/images/personGrayIcon.png";
import storeIcon from "../../../../assets/images/storeIcon.png";
import locationIcon from "../../../../assets/images/locationIcon.png";
import taxIcon from "../../../../assets/images/taxIcon.png";
import multiplePeopleIcon from "../../../../assets/images/multiplePeopleIcon.png";
import bankIcon from "../../../../assets/images/bankIcon.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const AdminPage = () => {
  const navigation = useNavigation();
  const hotels = useSelector((state) => state.meal.hotel.hotels);
  const isLoading = useSelector((state) => state.meal.hotel.isLoading);
  const isError = useSelector((state) => state.meal.hotel.isError);
  const [selected, setSelected] = useState("");

  const openResturant = (val) => {
    if (val === selected) {
      setSelected("");
      return;
    }

    setSelected(val);
  };

  return (
    <MainScreenContainer leftImage={person} title={"Admin"}>
      <View style={{ width: "90%", alignItems: "center", marginBottom: 50 }}>
        {hotels.map((item, i) => (
          <View key={i} style={{ width: "100%", alignItems: "center" }}>
            <ResturantName
              name={item.name}
              selected={selected === i}
              setSelected={() => openResturant(i)}
              isAdmin
              customComponent
            />

            {selected === i && (
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
                    name={item.location}
                    rightText={"1 Location"}
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
                    rightText={"6 Users"}
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
              </View>
            )}
          </View>
        ))}
      </View>
    </MainScreenContainer>
  );
};
