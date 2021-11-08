import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
import { RecipeDetailPage } from "./RecipeDetailPage";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";

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
  const [filteredItem, setFiltereditem] = useState(list);
  const [selectedRecipeItemForTab, setselectedRecipeItemForTab] = useState({});

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
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
  //       leftImage={""}
  //       rightImage={""}
  //       title={"Recipe Engineering"}
  //       noScroll
  //     >
  //       <HeadingBox noBack heading={"Recipe Engineering"} />
  //       <View
  //         style={{
  //           width: "100%",
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
  //                   onPress={fetchRecipes}
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
  //                     <SearchInput
  //                       search={search}
  //                       setSearch={setSearch}
  //                       searchKeyword={searchKeyword}
  //                     />
  //                   </View>

  //                   <View style={{ width: "100%", marginTop: 20 }}>
  //                     {filteredItem.length === 0 ? (
  //                       <NoMealBox
  //                         image={noRecipe}
  //                         text={"No recipe added. "}
  //                       />
  //                     ) : (
  //                       filteredItem.map((item, i) => (
  //                         <View
  //                           key={i}
  //                           style={{ width: "100%", marginTop: 10 }}
  //                         >
  //                           <AdminOverviewBox
  //                             key={i}
  //                             label={item.recipeTitle}
  //                             name={`Macro: ${item.macroIngredient.itemName}`}
  //                             rightText={""}
  //                             onPress={() => setselectedRecipeItemForTab(item)}
  //                           />
  //                         </View>
  //                       ))
  //                     )}
  //                   </View>
  //                   <RegularButton
  //                     onPress={() => navigation.navigate("recipeAdd")}
  //                     text={"Add Recipe"}
  //                     style={{ borderRadius: 10, marginTop: 20 }}
  //                   />
  //                 </View>
  //               )}
  //             </View>
  //           </ScrollView>
  //         </View>

  //         <View style={{ width: "60%" }}>
  //           {selectedRecipeItemForTab?.recipeTitle && (
  //             <RecipeDetailPage isTab data={selectedRecipeItemForTab} />
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

          <View style={{ width: "100%", marginTop: 10 }}>
            {filteredItem.length === 0 ? (
              <NoMealBox image={noRecipe} text={"No recipe added. "} />
            ) : (
              filteredItem.map((item, i) => (
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
                  />
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
