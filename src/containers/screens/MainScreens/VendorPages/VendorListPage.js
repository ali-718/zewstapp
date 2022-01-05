import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/VendorActions/VendorActions";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import InventoryIcon from "../../../../assets/images/RecipeIcon.png";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { colors } from "../../../../helpers/utlils";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";

export const VendorListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const list = useSelector((state) => state.vendor.vendors.list);
  const isLoading = useSelector((state) => state.vendor.vendors.isLoading);
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

  return (
    <MainScreenContainer isDrawer>
      <HeadingBox heading={"Vendor"} noBack />
      <View
        style={{
          width: "90%",
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
              filteredItem.map((item, i) => (
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
                  />
                </View>
              ))
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
