import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import storeIcon from "../../../../assets/images/storeIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";

const dummylocations = ["Arcadia", "Detroit", "Ann Arbor", "Grand Rapids"];

export const LocationsPage = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState(dummylocations);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = dummylocations;
    const finalData = realData.filter((item) =>
      item?.toLowerCase()?.includes(keyword)
    );

    setLocations(finalData);
  };

  return (
    <MainScreenContainer title={"Locations"}>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <View style={{ width: "100%" }}>
          <Input
            placeholder={"Search"}
            iconName={search.length > 0 ? "cancel" : "search"}
            iconType={MaterialIcons}
            value={search}
            onChangeText={(val) => {
              setSearch(val);
              searchKeyword(val);
            }}
            style={{ height: 60 }}
            iconStyle={{ fontSize: 30 }}
            inputStyle={{ fontSize: 20 }}
            onIconClick={() => setSearch("")}
          />

          <View style={{ width: "100%", marginTop: 10 }}>
            {locations.map((item, i) => (
              <View style={{ width: "100%", marginTop: 10 }}>
                <AdminOverviewBox
                  key={i}
                  label={`Location ${i + 1}`}
                  name={item}
                  rightText={"Active"}
                  image={storeIcon}
                  onPress={() => navigation.navigate("addLocation")}
                />
              </View>
            ))}

            <TouchableOpacity
              style={{
                width: "100%",
                marginTop: 10,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 15,
              }}
              onPress={() => navigation.navigate("addLocation")}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "openSans_bold",
                  color: primaryColor,
                }}
              >
                Add Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
