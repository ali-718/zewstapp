import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import plus from "../../../../assets/images/plus.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../Redux/actions/HomeActions/MealActions";
import { Spinner } from "native-base";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { HEIGHT, WIDTH } from "../../../../helpers/utlils";
import { useNavigation } from "@react-navigation/core";
import editIcon from "../../../../assets/images/editIcon.png";
import { FoodDetailPage } from "./FoodDetailPage";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";

export const MenuPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const user = useSelector((state) => state.auth.user.user);
  const hotels = useSelector((state) => state.meal.hotel.hotels);
  const isLoading = useSelector((state) => state.meal.hotel.isLoading);
  const isError = useSelector((state) => state.meal.hotel.isError);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [selected, setSelected] = useState("");

  // for tablet only
  const [selectedFoodItemForTab, setSelectedFoodItemForTab] = useState({});

  useEffect(() => {
    fetchLocations();
  }, []);

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

  const onClickAvailable = (index, data) => {
    const item = [...filteredFoodItems];

    item[index] = data;

    setFilteredFoodItems(item);
  };

  const onOpenResturant = (id) => dispatch(actions.getAllMeals({ id }));

  if (device === "tablet" && orientation === "landscape") {
    return (
      <MainScreenContainer
        onPressRight={() =>
          navigation.navigate("addMeal", {
            data: {
              ...selectedFoodItemForTab,
              categories: selectedFoodItemForTab.mealCategory ?? [],
              allergens: selectedFoodItemForTab.mealAllergens ?? [],
              addons: selectedFoodItemForTab.mealAddons ?? [],
              days: selectedFoodItemForTab.mealDaysAvailable ?? [],
            },
          })
        }
        rightImage={selectedFoodItemForTab?.mealName && editIcon}
        title={"Menu"}
        noScroll
      >
        <View
          style={{
            width: "95%",
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
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      height: HEIGHT - 100,
                    }}
                  >
                    <Spinner size={"large"} color={primaryColor} />
                  </View>
                ) : isError ? (
                  <View
                    style={{
                      width: "100%",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      height: HEIGHT - 100,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>Unable to fetch data!</Text>
                    <RegularButton
                      isLoading={isLoading}
                      onPress={fetchLocations}
                      text={"Retry"}
                      style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
                    />
                  </View>
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
                        .filter(
                          (item) =>
                            item.locationId === defaultLocation.locationId
                        )
                        .map((item, i) => (
                          <ResturantName
                            key={i}
                            name={item?.name}
                            isLoading={item?.meal?.isLoading}
                            isError={item?.meal?.isError}
                            address={item.streetInfo}
                            selected={selected === i}
                            setSelected={() =>
                              openResturant(i, item.locationId)
                            }
                            foodItems={item?.meal?.meals || []}
                            onClickAvailable={(i, data) =>
                              onClickAvailable(i, data)
                            }
                            filteredFoodItems={item?.meal?.meals || []}
                            locationId={item.locationId}
                            isOriented={true}
                            setSelectedFoodItemForTab={
                              setSelectedFoodItemForTab
                            }
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
                    <Text
                      style={{
                        fontSize: 20,
                        width: "80%",
                        textAlign: "center",
                      }}
                    >
                      You need to add atleast one location to start the process
                      😃
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
                )}
              </View>
            </ScrollView>
          </View>
          <View style={{ width: "60%" }}>
            {selectedFoodItemForTab?.mealName && (
              <FoodDetailPage isTab data={selectedFoodItemForTab} />
            )}
          </View>
        </View>
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
                  onClickAvailable={(i, data) => onClickAvailable(i, data)}
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
