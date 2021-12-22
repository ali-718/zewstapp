import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../Redux/actions/HomeActions/MealActions";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import {
  chartHeaderColor,
  grayBorderColor,
  grayTextColor,
  menuHeadingColor,
} from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { HEIGHT } from "../../../../helpers/utlils";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";

export const MenuPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const user = useSelector((state) => state.auth.user.user);
  const hotels = useSelector((state) => state.meal.hotel.hotels);
  const isLoading = useSelector((state) => state.meal.hotel.isLoading);
  const isError = useSelector((state) => state.meal.hotel.isError);
  const {
    meals: tabletMeals,
    isLoading: tabletMealsLoading,
    isError: tabletMealsError,
  } = useSelector((state) => state.meal.tabletMeals);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const screenFocused = useIsFocused();

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = foodItems;

    const finalData = realData.filter((item) =>
      item.mealName?.toLowerCase()?.includes(keyword)
    );

    setFilteredFoodItems(finalData);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (tabletMeals.length > 0) {
      setFilteredFoodItems(tabletMeals);
    }
  }, [tabletMeals]);

  useEffect(() => {
    if (!screenFocused) return;
    const locationId = defaultLocation.locationId;

    if (!!locationId == false) return;

    onOpenResturant(locationId);
  }, [defaultLocation, screenFocused]);

  const fetchLocations = () =>
    dispatch(actions.getAllLocations({ userId: user.clientId }));

  const openResturant = (val, id) => {
    if (val === selected) {
      setSelected("");
      return;
    }
    onOpenResturant(id);
    setSelected(val);
  };

  const onOpenResturant = (id) => dispatch(actions.getAllMeals({ id }));

  if (device === "tablet") {
    return (
      <MainScreenContainer>
        {!!defaultLocation.locationId == false ? (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: HEIGHT - 100,
            }}
          >
            <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
              You need to add atleast one location to start the process 😃
            </Text>
            <RegularButton
              isLoading={isLoading}
              onPress={() =>
                navigation.navigate("addLocation", { isMenu: true })
              }
              text={"Add Location"}
              style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 50,
            }}
          >
            <View style={{ width: "95%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                <HeadingBox heading={"Menu items"} />
                {tabletMeals.length > 0 ? (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <RegularButton
                      onPress={() =>
                        navigation.navigate("addMeal", {
                          locationId: defaultLocation.locationId,
                        })
                      }
                      style={{ width: 250, right: 0, position: "absolute" }}
                      white
                      text={"+ Add a menu item"}
                    />
                  </View>
                ) : null}
                {tabletMealsLoading ? (
                  <LoadingPage />
                ) : tabletMealsError ? (
                  <RefetchDataError
                    onPress={() => onOpenResturant(defaultLocation.locationId)}
                    isLoading={isLoading}
                  />
                ) : tabletMeals.length > 0 ? (
                  <View
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "white",
                      marginTop: 20,
                      paddingTop: 0,
                      flex: 1,
                    }}
                  >
                    <SearchInput
                      style={{
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: grayBorderColor,
                        borderRadius: 10,
                        marginBottom: 20,
                      }}
                      search={search}
                      setSearch={setSearch}
                      searchKeyword={searchKeyword}
                    />
                    <ScrollView horizontal style={{ flex: 1 }}>
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 20,
                          marginTop: 10,
                        }}
                      >
                        {/* headings start */}
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            paddingVertical: 15,
                            backgroundColor: chartHeaderColor,
                            borderRadius: 10,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            marginLeft: 20,
                          }}
                        >
                          <View style={{ width: 250 }}>
                            <Text
                              style={{
                                fontFamily: "openSans_bold",
                                fontSize: 16,
                                color: menuHeadingColor,
                              }}
                            >
                              Items
                            </Text>
                          </View>
                          <View style={{ width: 150 }}>
                            <Text
                              style={{
                                fontFamily: "openSans_bold",
                                fontSize: 16,
                                color: menuHeadingColor,
                              }}
                            >
                              Orders
                            </Text>
                          </View>
                          <View style={{ width: 100 }}>
                            <Text
                              style={{
                                fontFamily: "openSans_bold",
                                fontSize: 16,
                                color: menuHeadingColor,
                              }}
                            >
                              Cost
                            </Text>
                          </View>
                          <View style={{ width: 150 }}>
                            <Text
                              style={{
                                fontFamily: "openSans_bold",
                                fontSize: 16,
                                color: menuHeadingColor,
                                textTansform: "uppercase",
                              }}
                            >
                              Menu Price
                            </Text>
                          </View>
                          <View style={{ width: 150 }}>
                            <Text
                              style={{
                                fontFamily: "openSans_bold",
                                fontSize: 16,
                                color: menuHeadingColor,
                              }}
                            >
                              Price with tax
                            </Text>
                          </View>
                        </View>
                        {/* headings ends */}
                        <View style={{ backgroundColor: "white" }}>
                          {filteredFoodItems.map((item, i) => (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("foodDetailPage", {
                                  item: {
                                    ...item,
                                    locationId: defaultLocation.locationId,
                                  },
                                })
                              }
                              key={i}
                              style={{
                                width: "100%",
                                paddingVertical: 15,
                                borderRadius: 10,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                marginLeft: 20,
                              }}
                            >
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                }}
                              >
                                <View style={{ width: 250 }}>
                                  <Text
                                    style={{
                                      fontFamily: "openSans_bold",
                                      fontSize: 16,
                                      color: menuHeadingColor,
                                    }}
                                  >
                                    {item.mealName}
                                  </Text>
                                </View>
                                <View style={{ width: 150 }}>
                                  <Text
                                    style={{
                                      fontFamily: "openSans_bold",
                                      fontSize: 16,
                                      color: menuHeadingColor,
                                    }}
                                  >
                                    {item.orderedNumber}
                                  </Text>
                                </View>
                                <View style={{ width: 100 }}>
                                  <Text
                                    style={{
                                      fontFamily: "openSans_bold",
                                      fontSize: 16,
                                      color: menuHeadingColor,
                                    }}
                                  >
                                    {item.mealTotalUnitCost}
                                  </Text>
                                </View>
                                <View style={{ width: 150 }}>
                                  <Text
                                    style={{
                                      fontFamily: "openSans_bold",
                                      fontSize: 16,
                                      color: menuHeadingColor,
                                      textTansform: "uppercase",
                                    }}
                                  >
                                    {item.mealPrice}
                                  </Text>
                                </View>
                                <View style={{ width: 150 }}>
                                  <Text
                                    style={{
                                      fontFamily: "openSans_bold",
                                      fontSize: 16,
                                      color: menuHeadingColor,
                                    }}
                                  >
                                    Price with tax
                                  </Text>
                                </View>
                              </View>
                              <View style={{ width: "100%", marginTop: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: grayTextColor,
                                  }}
                                >
                                  Crisp fried eggplant rolled with ricotta
                                  cheese and baked with tomato-basil sauce, and
                                  shredded cheese blend.
                                </Text>
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      height: HEIGHT - 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      You dont have any meals at the moment 😃
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </MainScreenContainer>
    );
  }

  return (
    <MainScreenContainer leftImage={person} title={"Menu"}>
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <RefetchDataError onPress={fetchLocations} isLoading={isLoading} />
      ) : hotels[0]?.locations.filter(
          (item) => item.locationId === defaultLocation.locationId
        ).length > 0 ? (
        <View
          style={{
            width: "90%",
            marginBottom: 60,
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            {hotels[0]?.locations
              .filter((item) => item.locationId === defaultLocation.locationId)
              .map((item, i) => (
                <ResturantName
                  key={i}
                  name={item?.name}
                  isLoading={item?.meal?.isLoading}
                  isError={item?.meal?.isError}
                  address={item.streetInfo}
                  selected={selected === i}
                  setSelected={() => openResturant(i, item.locationId)}
                  foodItems={item?.meal?.meals || []}
                  onClickAvailable={(i, data) => null}
                  filteredFoodItems={item?.meal?.meals || []}
                  locationId={item.locationId}
                />
              ))}
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT - 100,
          }}
        >
          <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
            You need to add atleast one location to start the process 😃
          </Text>
          <RegularButton
            isLoading={isLoading}
            onPress={() => navigation.navigate("addLocation", { isMenu: true })}
            text={"Add Location"}
            style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
          />
        </View>
      )}
    </MainScreenContainer>
  );
};
