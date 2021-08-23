import React, { useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import food1 from "../../../../assets/images/testFood.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";

const dummyData = [
  {
    name: "Grilled Chicken & Vegetable",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Veal Amore",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Shrim Pomodoro",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image: food1,
    cost: 8.99,
    savings: 2.99,
    available: false,
  },
];

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
    <MainScreenContainer title={"Menu"}>
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
