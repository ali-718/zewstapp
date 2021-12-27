import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../../components/Inputs/Input";
import { useNavigation } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import InventoryIcon from "../../../../assets/images/InventoryIcon.png";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { colors } from "../../../../helpers/utlils";

const data = [
  { itemName: "Milk", brand: "Dairy Milk" },
  { itemName: "Carrots", brand: "Walmart" },
  { itemName: "Brown rice", brand: "Bestbuy" },
];

export const DailyFoodLogListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const list = useSelector((state) => state.inventory.inventory.list);
  const isLoading = useSelector((state) => state.inventory.inventory.isLoading);
  const isError = useSelector((state) => state.inventory.inventory.isError);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState(data);
  const [selectedInventoryItemForTab, setselectedInventoryItemForTab] =
    useState({});

  const fetchInventoryItems = () =>
    dispatch(
      actions.fetchInventoryAction({ locationId: defaultLocation.locationId })
    );

  // useEffect(() => {
  //   fetchInventoryItems();
  // }, []);

  // useEffect(() => {
  //   setFiltereditem(list);
  // }, [list]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = data;
    const finalData = realData.filter(
      (item) =>
        item?.itemName?.toLowerCase()?.includes(keyword) ||
        item?.brand?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  if (device === "tablet" && orientation === "landscape") {
    return (
      <MainScreenContainer
        leftImage={""}
        rightImage={""}
        title={"Daily Food Log"}
        noScroll
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "40%" }}>
            <ScrollView style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                {isLoading ? (
                  <LoadingPage />
                ) : isError ? (
                  <RefetchDataError
                    onPress={fetchInventoryItems}
                    isLoading={isLoading}
                  />
                ) : (
                  <View style={{ width: "90%", flex: 1, marginTop: 20 }}>
                    <RegularButton
                      // onPress={() => navigation.navigate("inventoryAdd")}
                      text={"Add Item"}
                      style={{ borderRadius: 10 }}
                    />

                    <SearchInput
                      search={search}
                      setSearch={setSearch}
                      searchKeyword={searchKeyword}
                    />

                    {filteredItem.length === 0 ? (
                      <NoMealBox
                        image={InventoryIcon}
                        text={"No item added. "}
                      />
                    ) : (
                      filteredItem.map((item, i) => (
                        <View key={i} style={{ width: "100%", marginTop: 10 }}>
                          <AdminOverviewBox
                            key={i}
                            label={item?.itemName}
                            name={item.brand}
                            rightText={""}
                            image={InventoryIcon}
                            // inventory
                            // borderLeftColor={
                            //   colors.find((color) => item.color === color.title)
                            //     .color
                            // }
                            // onPress={() => setselectedInventoryItemForTab(item)}
                          />
                        </View>
                      ))
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </MainScreenContainer>
    );
  }

  return (
    <MainScreenContainer
      onPressRight={() => null}
      leftImage={""}
      rightImage={""}
      title={"Daily Food Log"}
    >
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
          <RefetchDataError
            onPress={fetchInventoryItems}
            isLoading={isLoading}
          />
        ) : (
          <View style={{ width: "100%", flex: 1 }}>
            <RegularButton
              // onPress={() => navigation.navigate("inventoryAdd")}
              text={"Add Item"}
              style={{ borderRadius: 10 }}
            />

            <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
            />

            {filteredItem.length === 0 ? (
              <NoMealBox image={InventoryIcon} text={"No item added. "} />
            ) : (
              filteredItem.map((item, i) => (
                <View key={i} style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    key={i}
                    label={item?.itemName}
                    name={item.brand}
                    rightText={""}
                    image={InventoryIcon}
                    // inventory
                    // borderLeftColor={
                    //   colors.find((color) => item.color === color.title).color
                    // }
                    // onPress={() =>
                    //   navigation.navigate("inventoryDetail", {
                    //     data: item,
                    //   })
                    // }
                  />
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </MainScreenContainer>
  );
};
