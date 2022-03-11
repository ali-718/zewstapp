import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../../components/Inputs/Input";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import InventoryIcon from "../../../../assets/images/RecipeIcon.png";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { colors } from "../../../../helpers/utlils";
import { InventoryDetailPage } from "./InventoryDetailPage";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import noRecipe from "../../../../assets/images/noRecipe.png";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import updateIcon from "../../../../assets/images/updateIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { boxWithShadow } from "../../../../theme/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { Text } from "../../../../components/Text/Text";
import { Spinner } from "native-base";

export const InventoryListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const deleteLoading = useSelector(
    (state) => state.inventory.deleteInventory.isLoading
  );
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const list = useSelector((state) => state.inventory.inventory.list);
  const category = useSelector((state) => state.inventory.inventory.category);
  const isLoading = useSelector((state) => state.inventory.inventory.isLoading);
  const isError = useSelector((state) => state.inventory.inventory.isError);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const [selectedInventoryItemForTab, setselectedInventoryItemForTab] =
    useState({});
  const isFocused = useIsFocused();

  const fetchInventoryItems = () =>
    dispatch(
      actions.fetchInventoryAction({ locationId: defaultLocation.locationId })
    );

  const deleteInventory = (id) =>
    dispatch(
      actions.deleteInventoryAction({
        locationId: defaultLocation.locationId,
        itemId: id,
        navigation: () => null,
        noBacK: true,
      })
    );

  useEffect(() => {
    if (!isFocused) return;
    fetchInventoryItems();
  }, [isFocused]);

  useEffect(() => {
    setFiltereditem(list ?? []);
  }, [list]);

  const fetchRecipes = () =>
    dispatch(
      actions.fetchRecipeActions({ locationId: defaultLocation.locationId })
    );

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter((item) =>
      item.itemName?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer isDrawer shortDrawer>
      <HeadingBox heading={"Inventory"} noBack />
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <RefetchDataError onPress={fetchRecipes} isLoading={isLoading} />
      ) : (
        <View
          style={{
            width: "100%",
            marginBottom: 60,
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <SearchInput
            search={search}
            setSearch={setSearch}
            searchKeyword={searchKeyword}
            style={{ marginTop: 20, marginBottom: 0 }}
          />

          <View
            style={{
              width: "100%",
            }}
          >
            {category?.length === 0 ? (
              <NoMealBox image={noRecipe} text={"No inventory added. "} />
            ) : (
              category.map((category, index) => (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 16,
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {category}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 10,
                    }}
                  >
                    <SwipeListView
                      data={filteredItem?.filter(
                        (recipe) => recipe.category === category
                      )}
                      renderItem={({ item, index }, i) => (
                        <View
                          key={index}
                          style={{
                            width: "100%",
                            marginTop: 10,
                            backgroundColor: "white",
                            borderRadius: 10,
                            padding: 10,
                          }}
                        >
                          <AdminOverviewBox
                            key={i}
                            label={item.itemName}
                            name={item.brand}
                            rightText={""}
                            onPress={() =>
                              navigation.navigate("inventoryAdd", {
                                data: item,
                              })
                            }
                            noLeftMargin
                            primary={false}
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
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => deleteInventory(item?.inventoryId)}
                            style={{
                              marginTop: 30,
                              backgroundColor: "#EA1A27",
                              marginBottom: 10,
                              justifyContent: "center",
                              width: 150,
                              height: "80%",
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
                              navigation.navigate("inventoryUpdate", {
                                data: item,
                              })
                            }
                            style={{
                              marginTop: 30,
                              backgroundColor: "#A561D8",
                              marginBottom: 10,
                              justifyContent: "center",
                              width: 150,
                              height: "80%",
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
                  </View>
                </View>
              ))
            )}
          </View>
          <RegularButton
            onPress={() => navigation.navigate("inventoryAdd")}
            text={"Add Inventory"}
            style={{ borderRadius: 10, marginTop: 20 }}
          />
        </View>
      )}
    </MainScreenContainer>
  );
};
