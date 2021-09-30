import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../../components/Inputs/Input";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import recipeVessel from "../../../../assets/images/recipeVessel.png";
import { useNavigation } from "@react-navigation/core";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import * as actions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import noRecipe from "../../../../assets/images/noRecipe.png";

export const RecipeListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const isLoading = useSelector((state) => state.recipe.recipe.isLoading);
  const isError = useSelector((state) => state.recipe.recipe.isError);
  const list = useSelector((state) => state.recipe.recipe.list);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const [selectedRecipeItemForTab, setselectedRecipeItemForTab] = useState({});

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (list.length === 0) return;

    setFiltereditem(list);
  }, [list]);

  const fetchRecipes = () =>
    dispatch(actions.fetchRecipeActions({ clientId: user.clientId }));

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;

    const finalData = realData.filter((item) =>
      item.recipeTitle?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  // if (device === "tablet" && orientation === "landscape") {
  //   return (
  //     <MainScreenContainer
  //       onPressRight={() => null}
  //       leftImage={""}
  //       rightImage={""}
  //       title={"Recipe Engineering"}
  //     >
  //       <View
  //         style={{
  //           width: "95%",
  //           flex: 1,
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <View style={{ width: "40%" }}>
  //           <ScrollView style={{ width: "100%" }}>
  //             <View
  //               style={{
  //                 width: "100%",
  //                 flex: 1,
  //                 alignItems: "center",
  //               }}
  //             >
  //               {isLoading ? (
  //                 <LoadingPage />
  //               ) : isError ? (
  //                 <RefetchDataError
  //                   onPress={fetchLocations}
  //                   isLoading={isLoading}
  //                 />
  //               ) : (
  //                 <View
  //                   style={{
  //                     width: "90%",
  //                     marginBottom: 60,
  //                     alignItems: "center",
  //                     marginTop: 20,
  //                   }}
  //                 >
  //                   <View style={{ width: "100%", flex: 1 }}>
  //                     <RegularButton
  //                       text={"Add Recipe"}
  //                       style={{ borderRadius: 10 }}
  //                     />

  //                     <Input
  //                       placeholder={"Search"}
  //                       iconName={search.length > 0 ? "cancel" : "search"}
  //                       iconType={MaterialIcons}
  //                       value={search}
  //                       setValue={(val) => {
  //                         setSearch(val);
  //                       }}
  //                       style={{ height: 60, marginTop: 20 }}
  //                       iconStyle={{ fontSize: 30 }}
  //                       inputStyle={{ fontSize: 20 }}
  //                       onIconClick={() => setSearch("")}
  //                     />
  //                   </View>

  //                   <View style={{ width: "100%", marginTop: 20 }}>
  //                     <AdminOverviewBox
  //                       label={"Alfredo Pasta"}
  //                       name={"Macro: Chicken"}
  //                       rightText={""}
  //                       image={recipeVessel}
  //                       recipe
  //                       onPress={() =>
  //                         navigation.navigate("recipeDetailPage", {
  //                           data: { name: "ali haider is a goodboy" },
  //                         })
  //                       }
  //                     />
  //                   </View>
  //                 </View>
  //               )}
  //             </View>
  //           </ScrollView>
  //         </View>

  //         <View style={{ width: "60%" }}>
  //           {selectedRecipeItemForTab?.name && (
  //             <FoodDetailPage isTab data={selectedRecipeItemForTab} />
  //           )}
  //         </View>
  //       </View>
  //     </MainScreenContainer>
  //   );
  // }

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
        <RefetchDataError onPress={fetchRecipes} isLoading={isLoading} />
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
            <RegularButton
              onPress={() => navigation.navigate("recipeAdd")}
              text={"Add Recipe"}
              style={{ borderRadius: 10 }}
            />

            <Input
              placeholder={"Search"}
              iconName={search.length > 0 ? "cancel" : "search"}
              iconType={MaterialIcons}
              value={search}
              setValue={(val) => {
                setSearch(val);
                searchKeyword(val);
              }}
              style={{ height: 60, marginTop: 20 }}
              iconStyle={{ fontSize: 30 }}
              inputStyle={{ fontSize: 20 }}
              onIconClick={() => setSearch("")}
            />
          </View>

          <View style={{ width: "100%", marginTop: 10 }}>
            {filteredItem.length === 0 ? (
              <NoMealBox image={noRecipe} text={"No recipe added. "} />
            ) : (
              filteredItem.map((item, i) => (
                <View style={{ width: "100%", marginTop: 10 }}>
                  <AdminOverviewBox
                    key={i}
                    label={item.recipeTitle}
                    name={`Macro: ${item.macroIngredient}`}
                    rightText={""}
                    image={recipeVessel}
                    recipe
                    onPress={() =>
                      navigation.navigate("recipeDetailPage", {
                        data: item,
                      })
                    }
                  />
                </View>
              ))
            )}
          </View>
        </View>
      )}
    </MainScreenContainer>
  );
};
