import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import storeIcon from "../../../../assets/images/storeIcon.png";
import { grayColor, grayShade1, primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import {
  getAllUserLocations,
  setPrimaryLocationAction,
} from "../../../../Redux/actions/AdminActions/LocationActions";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";

export const LocationsPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const list = useSelector((state) => state.locations.locations);
  const isLoading = useSelector((state) => state.locations.isLoading);
  const isError = useSelector((state) => state.locations.isError);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const device = useSelector((state) => state.system.device);
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

  const fetchLocations = () =>
    dispatch(getAllUserLocations({ userId: user.clientId }));

  const setPrimaryLocation = (payload) =>
    dispatch(setPrimaryLocationAction(payload));

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
            {/* <View style={{ width: "100%", marginTop: 0 }}>
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  backgroundColor: grayShade1,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ fontFamily: "openSans_bold", color: primaryColor }}
                >
                  Primary Location
                </Text>
              </View>

              {defaultLocation.locationId ? (
                <AdminOverviewBox
                  label={defaultLocation.address}
                  name={defaultLocation.locationName}
                  rightText={"primary"}
                  image={storeIcon}
                  onPress={() => null}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    padding: device === "tablet" ? 20 : 10,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: device === "tablet" ? 20 : 16,
                      fontFamily: "openSans_bold",
                      color: "black",
                    }}
                  >
                    No default location selected
                  </Text>
                </View>
              )}
            </View> */}
            <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
            />

            <View style={{ width: "100%", marginTop: 10 }}>
              {locations.map((item, i) => (
                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    key={i}
                    label={`Location ${i + 1}`}
                    name={item.locationName}
                    rightText={
                      defaultLocation.locationId === item.locationId
                        ? "Primary"
                        : ""
                    }
                    image={storeIcon}
                    onPress={() =>
                      navigation.navigate("addLocation", { data: item })
                    }
                    onLongPress={() => setPrimaryLocation(item)}
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
                    fontSize: device === "tablet" ? 25 : 20,
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
