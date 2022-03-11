import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/VendorActions/VendorActions";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import InventoryIcon from "../../../../assets/images/RecipeIcon.png";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import updateIcon from "../../../../assets/images/updateIcon.png";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { colors } from "../../../../helpers/utlils";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { SwipeListView } from "react-native-swipe-list-view";
import { Spinner } from "native-base";
import { Text } from "../../../../components/Text/Text";

export const VendorListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const list = useSelector((state) => state.vendor.vendors.list);
  const isLoading = useSelector((state) => state.vendor.vendors.isLoading);
  const deleteLoading = useSelector(
    (state) => state.vendor.deleteVendors.isLoading
  );
  const isError = useSelector((state) => state.vendor.vendors.isError);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const screenFocused = useIsFocused();

  const fetchVendors = () =>
    dispatch(
      actions.fetchVendorActions({ locationId: defaultLocation.locationId })
    );

  useEffect(() => {
    if (!screenFocused) return;
    fetchVendors();
  }, [screenFocused]);

  useEffect(() => {
    setFiltereditem(list);
  }, [list]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter(
      (item) =>
        item?.itemName?.toLowerCase()?.includes(keyword) ||
        item?.brand?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  const deleteVendor = (vendorId) => {
    dispatch(
      actions.deleteVendorActions({
        locationId: defaultLocation.locationId,
        vendorId,
      })
    );
  };

  return (
    <MainScreenContainer shortDrawer isDrawer>
      <HeadingBox heading={"Vendor"} noBack />
      <View
        style={{
          width: "100%",
          marginBottom: 60,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <RefetchDataError onPress={fetchVendors} isLoading={isLoading} />
        ) : (
          <View style={{ width: "100%", flex: 1 }}>
            {/* <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
            /> */}

            {filteredItem.length === 0 ? (
              <NoMealBox image={InventoryIcon} text={"No vendor added. "} />
            ) : (
              <SwipeListView
                data={filteredItem}
                renderItem={({ item, index }, i) => (
                  <View key={i} style={{ width: "100%", marginTop: 10 }}>
                    <AdminOverviewBox
                      key={i}
                      label={item?.name}
                      name={item.email}
                      rightText={""}
                      image={InventoryIcon}
                      onPress={() =>
                        navigation.navigate("vendorAdd", {
                          data: item,
                        })
                      }
                      activeOpacity={1}
                    />
                  </View>
                )}
                renderHiddenItem={({ item }, rowMap) => (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      overflow: "hidden",
                      height: 80,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => deleteVendor(item?.vendorId)}
                      style={{
                        marginTop: 30,
                        backgroundColor: "#EA1A27",
                        marginBottom: 25,
                        justifyContent: "center",
                        width: 150,
                        height: 60,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        alignItems: "center",
                      }}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <Spinner size="sm" color={"white"} />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={deleteIconWhite}
                            style={{ width: 15, height: 18 }}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontFamily: "openSans_bold",
                              marginLeft: 15,
                            }}
                          >
                            Delete
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("vendorAdd", {
                          data: item,
                        })
                      }
                      style={{
                        marginTop: 30,
                        backgroundColor: "#A561D8",
                        marginBottom: 25,
                        justifyContent: "center",
                        width: 150,
                        height: 60,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: "center",
                      }}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <Spinner size="sm" color={"white"} />
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={updateIcon}
                            style={{
                              width: 18,
                              height: 15,
                              resizeMode: "contain",
                            }}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontFamily: "openSans_bold",
                              marginLeft: 15,
                            }}
                          >
                            Update
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={150}
                rightOpenValue={-150}
              />

              // filteredItem.map((item, i) => (
              //   <View key={i} style={{ width: "100%", marginTop: 10 }}>
              //     <AdminOverviewBox
              //       key={i}
              //       label={item?.name}
              //       name={item.email}
              //       rightText={""}
              //       image={InventoryIcon}
              //       onPress={() =>
              //         navigation.navigate("vendorAdd", {
              //           data: item,
              //         })
              //       }
              //     />
              //   </View>
              // ))
            )}
            <RegularButton
              onPress={() => navigation.navigate("vendorAdd")}
              text={"+ Add Vendor"}
              style={{ marginTop: 20 }}
            />
          </View>
        )}
      </View>
    </MainScreenContainer>
  );
};
