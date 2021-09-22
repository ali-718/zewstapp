import { Icon, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../components/Text/Text";
import {
  grayShade1,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../components/Inputs/Input";
import noMealAdded from "../../assets/images/noMealAdded.png";
import magnifier from "../../assets/images/magnifier.png";
import { NoMealBox } from "../../components/NoMealBox/NoMealBox";
import { FoodOverview } from "../../components/FoodItems/FoodItemOverview";
import { useNavigation } from "@react-navigation/native";
import { RegularButton } from "../Buttons/RegularButton";
import { useSelector } from "react-redux";

export const ResturantName = ({
  name,
  address,
  setSelected,
  selected,
  foodItems,
  onClickAvailable,
  isAdmin = false,
  isLoading,
  isError,
  locationId,
  isOriented,
  setSelectedFoodItemForTab,
}) => {
  const device = useSelector((state) => state.system.device);
  const [isEdit, setisEdit] = useState(false);
  const navigation = useNavigation();
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = foodItems;

    const finalData = realData.filter((item) =>
      item.mealName?.toLowerCase()?.includes(keyword)
    );

    setFilteredFoodItems(finalData);
  };

  useEffect(() => {
    if (foodItems?.length === 0) return;

    setFilteredFoodItems(foodItems);
  }, [foodItems]);

  return (
    <View style={{ width: "100%", marginTop: 30 }}>
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => {
          setSelected();
          setisEdit(false);
        }}
      >
        <View style={{ width: "85%" }}>
          <Text
            style={{
              fontSize: device === "tablet" ? 30 : 22,
              color: "black",
              fontFamily: "openSans_bold",
            }}
          >
            {name}
          </Text>
          {address && (
            <Text
              style={{
                fontSize: device === "tablet" ? 20 : 14,
                color: grayTextColor,
                marginTop: 5,
              }}
            >
              {address}
            </Text>
          )}
        </View>
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          <Icon
            style={{
              fontSize: device === "tablet" ? 45 : 25,
              color: grayTextColor,
            }}
            name={selected ? "keyboard-arrow-down" : "keyboard-arrow-right"}
            as={MaterialIcons}
          />
        </View>
      </TouchableOpacity>

      {!isAdmin && selected ? (
        <View style={{ width: "100%", flex: 1 }}>
          <View
            style={{
              width: "100%",
              marginTop: 15,
              borderRadius: 10,
              backgroundColor: grayShade1,
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "openSans_bold",
                color: grayTextColor,
                textTransform: "uppercase",
              }}
            >
              Menu items - {filteredFoodItems.length}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isEdit ? (
                <TouchableOpacity onPress={() => setisEdit(false)}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "openSans_bold",
                      color: primaryShade1,
                      textTransform: "uppercase",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  {/* {foodItems.length > 0 && (
                    <TouchableOpacity onPress={() => setisEdit(true)}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "openSans_bold",
                          color: primaryShade1,
                          textTransform: "uppercase",
                        }}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                  )} */}

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("addMeal", {
                        locationId,
                      })
                    }
                    style={{ marginLeft: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "openSans_bold",
                        color: primaryShade1,
                        textTransform: "uppercase",
                      }}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {foodItems.length > 0 && (
            <View style={{ width: "100%", marginTop: 10 }}>
              <Input
                placeholder={"Search"}
                iconName={search.length > 0 ? "cancel" : "search"}
                iconType={MaterialIcons}
                value={search}
                setValue={(val) => {
                  setSearch(val);
                  searchKeyword(val);
                }}
                style={{ height: 60 }}
                iconStyle={{ fontSize: 30 }}
                inputStyle={{ fontSize: 20 }}
                onIconClick={() => setSearch("")}
              />
            </View>
          )}

          <View style={{ width: "100%", marginTop: 10 }}>
            {foodItems.length > 0 ? (
              filteredFoodItems.length > 0 ? (
                <>
                  {filteredFoodItems.map((item, i) => (
                    <FoodOverview
                      key={i}
                      image={item.mealMedia[0] ?? ""}
                      name={item.mealName}
                      desc={item.mealDescription}
                      cost={item.mealPrice}
                      savings={item.savings ?? "0"}
                      available={item.mealAvailability}
                      isEdit={isEdit}
                      onClickAvailable={() =>
                        onClickAvailable(i, {
                          ...item,
                          mealAvailability: item.available ? false : true,
                        })
                      }
                      onPress={() =>
                        isOriented
                          ? setSelectedFoodItemForTab(item)
                          : !isEdit &&
                            navigation.navigate("foodDetailPage", {
                              item: { ...item, locationId },
                            })
                      }
                    />
                  ))}
                  {isLoading && (
                    <Spinner
                      style={{ marginTop: 20 }}
                      size={"large"}
                      color={primaryColor}
                    />
                  )}
                </>
              ) : (
                <NoMealBox image={magnifier} text={"No items found"} />
              )
            ) : isLoading ? (
              <Spinner
                style={{ marginTop: 20 }}
                size={"large"}
                color={primaryColor}
              />
            ) : isError ? (
              <View
                style={{ width: "100%", marginTop: 20, alignItems: "center" }}
              >
                <Text style={{ fontSize: 20 }}>Unable to fetch data!</Text>
                <RegularButton
                  isLoading={isLoading}
                  // onPress={OnClick}
                  text={"Retry"}
                  style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
                />
              </View>
            ) : (
              <NoMealBox image={noMealAdded} text={"No meal is added"} />
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};
