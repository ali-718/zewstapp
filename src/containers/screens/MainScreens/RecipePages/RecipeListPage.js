import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../../components/Inputs/Input";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import recipeVessel from "../../../../assets/images/recipeVessel.png";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import * as actions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import noRecipe from "../../../../assets/images/noRecipe.png";
import { RecipeDetailPage } from "./RecipeDetailPage";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";

export const RecipeListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const isLoading = useSelector((state) => state.recipe.recipe.isLoading);
  const isError = useSelector((state) => state.recipe.recipe.isError);
  const list = useSelector((state) => state.recipe.recipe.list);
  const category = useSelector((state) => state.recipe.recipe.category);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const [selectedRecipeItemForTab, setselectedRecipeItemForTab] = useState({});
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    fetchRecipes();
  }, [isFocused]);

  useEffect(() => {
    setFiltereditem(list);
  }, [list]);

  const fetchRecipes = () =>
    dispatch(
      actions.fetchRecipeActions({ locationId: defaultLocation.locationId })
    );

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter((item) =>
      item.recipeTitle?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer isDrawer shortDrawer>
      <HeadingBox noBack heading={"Recipe Engineering"} />
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <RefetchDataError onPress={fetchRecipes} isLoading={isLoading} />
      ) : (
        <View
          style={{
            width: "90%",
            marginBottom: 60,
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
            />
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            {category?.length === 0 ? (
              <NoMealBox image={noRecipe} text={"No recipe added. "} />
            ) : (
              category.map((category) => (
                <View
                  style={{
                    width: "100%",
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 16,
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
                    {filteredItem
                      ?.filter((recipe) => recipe.recipeCategory === category)
                      .map((item, i) => (
                        <View
                          key={i}
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
                            label={item.recipeTitle}
                            name={`Macro: ${item.macroIngredient.itemName}`}
                            rightText={""}
                            onPress={() =>
                              navigation.navigate("recipeDetailPage", {
                                data: item,
                              })
                            }
                            noLeftMargin
                            primary={false}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              ))
            )}
          </View>
          <RegularButton
            onPress={() => navigation.navigate("recipeAdd")}
            text={"Add Recipe"}
            style={{ borderRadius: 10, marginTop: 20 }}
          />
        </View>
      )}
    </MainScreenContainer>
  );
};
