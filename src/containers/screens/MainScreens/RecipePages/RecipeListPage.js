import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../../components/Inputs/Input";

export const RecipeListPage = () => {
  const isLoading = useSelector((state) => state.recipe.recipe.isLoading);
  const isError = useSelector((state) => state.recipe.recipe.isError);
  const [search, setSearch] = useState("");

  //   const searchKeyword = (text) => {
  //     const keyword = text?.toLowerCase();
  //     const realData = foodItems;

  //     const finalData = realData.filter((item) =>
  //       item.mealName?.toLowerCase()?.includes(keyword)
  //     );

  //     setFilteredFoodItems(finalData);
  //   };

  return (
    <MainScreenContainer
      onPressRight={() => null}
      leftImage={""}
      rightImage={""}
      title={"Recipe Engineering"}
    >
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <RefetchDataError onPress={fetchLocations} isLoading={isLoading} />
      ) : (
        <View
          style={{
            width: "90%",
            marginBottom: 60,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <RegularButton text={"Add Recipe"} style={{ borderRadius: 10 }} />

            <Input
              placeholder={"Search"}
              iconName={search.length > 0 ? "cancel" : "search"}
              iconType={MaterialIcons}
              value={search}
              setValue={(val) => {
                setSearch(val);
              }}
              style={{ height: 60, marginTop: 20 }}
              iconStyle={{ fontSize: 30 }}
              inputStyle={{ fontSize: 20 }}
              onIconClick={() => setSearch("")}
            />
          </View>
        </View>
      )}
    </MainScreenContainer>
  );
};
