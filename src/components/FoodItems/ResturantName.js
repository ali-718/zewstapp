import { Icon } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../components/Text/Text";
import { grayShade1, grayTextColor, primaryShade1 } from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../components/Inputs/Input";
import noMealAdded from "../../assets/images/noMealAdded.png";
import magnifier from "../../assets/images/magnifier.png";
import { NoMealBox } from "../../components/NoMealBox/NoMealBox";
import { FoodOverview } from "../../components/FoodItems/FoodItemOverview";
import { useNavigation } from "@react-navigation/native";

export const ResturantName = ({
  name,
  address,
  setSelected,
  selected,
  search,
  setSearch,
  foodItems,
  onClickAvailable,
  filteredFoodItems,
  isAdmin = false,
}) => {
  const [isEdit, setisEdit] = useState(false);
  const navigation = useNavigation();

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
              fontSize: 22,
              color: "black",
              fontFamily: "openSans_bold",
            }}
          >
            {name}
          </Text>
          {address && (
            <Text
              style={{
                fontSize: 14,
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
            style={{ fontSize: 25, color: grayTextColor }}
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
              Menu items - 8
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
                  {foodItems.length > 0 && (
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
                  )}

                  <TouchableOpacity
                    onPress={() => navigation.navigate("addMeal")}
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
                onChangeText={(val) => setSearch(val)}
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
                filteredFoodItems.map((item, i) => (
                  <FoodOverview
                    key={i}
                    image={item.image}
                    name={item.name}
                    desc={item.desc}
                    cost={item.cost}
                    savings={item.savings}
                    available={item.available}
                    isEdit={isEdit}
                    onClickAvailable={() =>
                      onClickAvailable(i, {
                        ...item,
                        available: item.available ? false : true,
                      })
                    }
                    onPress={() =>
                      !isEdit && navigation.navigate("foodDetailPage", { item })
                    }
                  />
                ))
              ) : (
                <NoMealBox image={magnifier} text={"No items found"} />
              )
            ) : (
              <NoMealBox image={noMealAdded} text={"No meal is added"} />
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};
