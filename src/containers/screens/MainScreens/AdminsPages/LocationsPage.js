import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import storeIcon from "../../../../assets/images/storeIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { getAllUserLocations } from "../../../../Redux/actions/AdminActions/LocationActions";

export const LocationsPage = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user.user);
  const list = useSelector((state) => state.locations.locations);
  const isLoading = useSelector((state) => state.locations.isLoading);
  const isError = useSelector((state) => state.locations.isError);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter(
      (item) =>
        item?.locationName?.toLowerCase()?.includes(keyword) ||
        item?.address?.toLowerCase()?.includes(keyword)
    );

    setLocations(finalData);
  };

  useEffect(() => {
    if (list.length > 0) return;

    fetchLocations();
  }, []);

  useEffect(() => {
    if (list.length === 0) return;

    setLocations(list);
  }, [list]);

  const fetchLocations = () => getAllUserLocations({ userId: user.clientId });

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
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <RefetchDataError onPress={fetchLocations} isLoading={isLoading} />
        ) : (
          <View style={{ width: "100%" }}>
            <Input
              placeholder={"Search"}
              iconName={"search"}
              iconType={MaterialIcons}
              value={search}
              onChangeText={(val) => {
                setSearch(val);
                searchKeyword(val);
              }}
              style={{ height: 60 }}
              iconStyle={{ fontSize: 30 }}
              inputStyle={{ fontSize: 20 }}
            />

            <View style={{ width: "100%", marginTop: 10 }}>
              {locations.map((item, i) => (
                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    key={i}
                    label={`Location ${i + 1}`}
                    name={item.locationName}
                    rightText={""}
                    image={storeIcon}
                    onPress={() =>
                      navigation.navigate("addLocation", { data: item })
                    }
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
        )}
      </View>
    </MainScreenContainer>
  );
};
