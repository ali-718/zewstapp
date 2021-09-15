import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import plus from "../../../../assets/images/plus.png";
import { ResturantName } from "../../../../components/FoodItems/ResturantName";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../Redux/actions/HomeActions/MealActions";

const dummyData = [
  {
    name: "Grilled Chicken & Vegetable mix",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/05/10/0/WU0502H_spicy-roasted-chicken-legs-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1620689296042.jpeg",
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Veal Amore",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/05/10/0/WU0502H_spicy-roasted-chicken-legs-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1620689296042.jpeg",
    cost: 8.99,
    savings: 2.99,
    available: true,
  },
  {
    name: "Shrim Pomodoro",
    desc: "Crisp fried eggplant rolled with ricotta cheese and baked with tomato-basil sauce, and shredded cheese blend.",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/05/10/0/WU0502H_spicy-roasted-chicken-legs-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1620689296042.jpeg",
    cost: 8.99,
    savings: 2.99,
    available: false,
  },
];

export const MenuPage = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.meal.hotel.hotels);
  const isLoading = useSelector((state) => state.meal.hotel.isLoading);
  const isError = useSelector((state) => state.meal.hotel.isError);
  const [selected, setSelected] = useState("");

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

  return (
    <MainScreenContainer leftImage={person} rightImage={plus} title={"Menu"}>
      <View
        style={{
          width: "90%",
          marginBottom: 60,
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {hotels.map((item, i) => (
            <ResturantName
              key={i}
              name={item.name}
              isLoading={item.meal?.isLoading}
              isError={item.meal?.isError}
              address={item.location}
              selected={selected === 0}
              setSelected={() => openResturant(i, item.id)}
              foodItems={item.meal?.meals || []}
              onClickAvailable={(i, data) => onClickAvailable(i, data)}
              filteredFoodItems={item.meal?.meals || []}
              locationId={item.id}
            />
          ))}
        </View>
      </View>
    </MainScreenContainer>
  );
};
