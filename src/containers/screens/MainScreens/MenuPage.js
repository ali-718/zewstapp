import { Icon } from "native-base";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/Text/Text";
import {
  grayShade1,
  grayShade2,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../theme/colors";
import { MainScreenContainer } from "../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../components/Inputs/Input";
import food1 from "../../../assets/images/food3.png";
import dollarIcon from "../../../assets/images/dollarIcon.png";
import walletIcon from "../../../assets/images/walletIcon.png";
import switchOn from "../../../assets/images/switchOn.png";
import switchOff from "../../../assets/images/switchOff.png";
import deleteIcon from "../../../assets/images/deleteIcon.png";
import noMealAdded from "../../../assets/images/noMealAdded.png";
import magnifier from "../../../assets/images/magnifier.png";
import { NoMealBox } from "../../../components/NoMealBox/NoMealBox";
import { FoodOverview } from "../../../components/FoodItems/FoodItemOverview";

const dummyData = [
  {
    name: "Grilled Chicken & Vegetable",
    desc: "Chicken topped with asparagus and mozarella",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Veal Amore",
    desc: "Chicken topped with asparagus and mozarella",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Shrim Pomodoro",
    desc: "Chicken topped with asparagus and mozarella",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: false,
  },
];

const ResturantName = ({
  name,
  address,
  setSelected,
  selected,
  search,
  setSearch,
  foodItems,
  onClickAvailable,
  filteredFoodItems,
}) => {
  const [isEdit, setisEdit] = useState(false);

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
          <Text
            style={{
              fontSize: 14,
              color: grayTextColor,
              marginTop: 5,
            }}
          >
            {address}
          </Text>
        </View>
        <View style={{ width: "10%", alignItems: "flex-end" }}>
          <Icon
            style={{ fontSize: 20, color: grayTextColor }}
            name={"arrow-forward-ios"}
            as={MaterialIcons}
          />
        </View>
      </TouchableOpacity>

      {selected ? (
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

                  <TouchableOpacity style={{ marginLeft: 10 }}>
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

export const MenuPage = () => {
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [dummyFoodItems, setDummyFoodItems] = useState(dummyData);
  const [filteredFoodItems, setFilteredFoodItems] = useState(dummyData);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = dummyFoodItems;
    const finalData = realData.filter((item) =>
      item.name?.toLowerCase()?.includes(keyword)
    );

    setFilteredFoodItems(finalData);
  };

  const openResturant = (val) => {
    if (val === selected) {
      setSelected("");
      return;
    }

    setSelected(val);
  };

  const onClickAvailable = (index, data) => {
    const item = [...filteredFoodItems];

    item[index] = data;

    console.log(data);
    setFilteredFoodItems(item);
  };

  return (
    <MainScreenContainer>
      <View
        style={{
          width: "90%",
          marginBottom: 60,
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <ResturantName
            name={"Rocco Italian Grill - Arcadia"}
            address={"17080 Northwood Hwy, Arcadia, MI 49613"}
            selected={selected === 0}
            setSelected={() => openResturant(0)}
            search={search}
            setSearch={(val) => {
              setSearch(val);
              searchKeyword(val);
            }}
            foodItems={dummyFoodItems}
            onClickAvailable={(i, data) => onClickAvailable(i, data)}
            searchKeyword={searchKeyword}
            filteredFoodItems={filteredFoodItems}
          />
          <ResturantName
            name={"Chinese Grill"}
            address={"17080 Northwood Hwy, Arcadia, MI 49613"}
            selected={selected === 1}
            setSelected={() => openResturant(1)}
            search={search}
            setSearch={(val) => {
              setSearch(val);
              searchKeyword(val);
            }}
            foodItems={dummyFoodItems}
            onClickAvailable={(i, data) => onClickAvailable(i, data)}
            searchKeyword={searchKeyword}
            filteredFoodItems={filteredFoodItems}
          />
          <ResturantName
            name={"Texas Wings"}
            address={"17080 Northwood Hwy, Arcadia, MI 49613"}
            selected={selected === 2}
            setSelected={() => openResturant(2)}
            search={search}
            setSearch={(val) => {
              setSearch(val);
              searchKeyword(val);
            }}
            foodItems={[]}
            onClickAvailable={(i, data) => onClickAvailable(i, data)}
            searchKeyword={searchKeyword}
            filteredFoodItems={filteredFoodItems}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
