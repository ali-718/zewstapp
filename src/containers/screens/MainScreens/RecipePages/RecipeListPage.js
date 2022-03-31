import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
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
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import updateIcon from "../../../../assets/images/updateIcon.png";
import { RecipeDetailPage } from "./RecipeDetailPage";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { SwipeListView } from "react-native-swipe-list-view";
import { Spinner } from "native-base";

export const RecipeListPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.user);
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const isLoading = useSelector((state) => state.recipe.recipe.isLoading);
  const isError = useSelector((state) => state.recipe.recipe.isError);
  const list = useSelector((state) => state.recipe.recipe.list);
  const mixtureList = useSelector((state) => state.recipe.mixture.list);
  const category = useSelector((state) => state.recipe.recipe.category);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const [selectedRecipeItemForTab, setselectedRecipeItemForTab] = useState({});
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const deleteLoading = useSelector(
    (state) => state.recipe.deleteRecipe.isLoading
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    Promise.all([fetchRecipes(), fetchMixtures()]);
  }, [isFocused]);

  useEffect(() => {
    setFiltereditem(list);
  }, [list]);

  const fetchRecipes = () =>
    dispatch(
      actions.fetchRecipeActions({ locationId: defaultLocation.locationId })
    );

  const fetchMixtures = () =>
    dispatch(
      actions.fetchMixtureActions({ locationId: defaultLocation.locationId })
    );

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter((item) =>
      item.recipeTitle?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  const onDeleteRecipe = ({ catalogId, locationId }) => {
    dispatch(
      actions.deleteRecipeAction({
        catalogId,
        locationId,
      })
    );
  };

  const onDeleteMixture = ({ mixtureId, locationId }) => {
    dispatch(
      actions.deleteMixtureAction({
        mixtureId,
        locationId,
      })
    );
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
            width: "100%",
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
            {mixtureList.length > 0 ? (
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
                  Mixtures
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  <SwipeListView
                    data={mixtureList}
                    renderItem={({ item, index }, i) => (
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
                          label={item.mixtureTitle}
                          name={`Ingredients: ${item.ingredients.length}`}
                          rightText={""}
                          onPress={() =>
                            navigation.navigate("mixtureDetailPage", {
                              data: item,
                            })
                          }
                          noLeftMargin
                          primary={false}
                        />
                      </View>
                    )}
                    renderHiddenItem={({ item }, rowMap) => (
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            onDeleteMixture({
                              mixtureId: item.mixtureId,
                              locationId: item.locationId,
                            })
                          }
                          style={{
                            marginTop: 15,
                            backgroundColor: "#EA1A27",
                            marginBottom: 10,
                            justifyContent: "center",
                            width: 150,
                            height: "80%",
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            alignItems: "center",
                          }}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? (
                            <Spinner size="sm" color={"white"} />
                          ) : (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                source={deleteIconWhite}
                                style={{ width: 15, height: 18 }}
                              />
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 14,
                                  fontFamily: "openSans_bold",
                                  marginLeft: 15,
                                }}
                              >
                                Delete
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("mixtureAdd", {
                              data: item,
                            })
                          }
                          style={{
                            marginTop: 30,
                            backgroundColor: "#A561D8",
                            marginBottom: 10,
                            justifyContent: "center",
                            width: 150,
                            height: "80%",
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            alignItems: "center",
                          }}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? (
                            <Spinner size="sm" color={"white"} />
                          ) : (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                source={updateIcon}
                                style={{
                                  width: 18,
                                  height: 15,
                                  resizeMode: "contain",
                                }}
                              />
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 14,
                                  fontFamily: "openSans_bold",
                                  marginLeft: 15,
                                }}
                              >
                                Update
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                    leftOpenValue={150}
                    rightOpenValue={-150}
                  />
                </View>
              </View>
            ) : null}

            {category?.length === 0 && mixtureList.length === 0 ? (
              <NoMealBox image={noRecipe} text={"No recipe added."} />
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
                    <SwipeListView
                      data={filteredItem?.filter(
                        (recipe) => recipe.recipeCategory === category
                      )}
                      renderItem={({ item, index }, i) => (
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
                            name={`Ingredients: ${item.ingredients.length}`}
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
                      )}
                      renderHiddenItem={({ item }, rowMap) => (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            overflow: "hidden",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              onDeleteRecipe({
                                catalogId: item.catalogId,
                                locationId: item.locationId,
                              })
                            }
                            style={{
                              marginTop: 15,
                              backgroundColor: "#EA1A27",
                              marginBottom: 10,
                              justifyContent: "center",
                              width: 150,
                              height: "80%",
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                              alignItems: "center",
                            }}
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <Spinner size="sm" color={"white"} />
                            ) : (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  source={deleteIconWhite}
                                  style={{ width: 15, height: 18 }}
                                />
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 14,
                                    fontFamily: "openSans_bold",
                                    marginLeft: 15,
                                  }}
                                >
                                  Delete
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("recipeAdd", {
                                data: item,
                              })
                            }
                            style={{
                              marginTop: 30,
                              backgroundColor: "#A561D8",
                              marginBottom: 10,
                              justifyContent: "center",
                              width: 150,
                              height: "80%",
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                              alignItems: "center",
                            }}
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <Spinner size="sm" color={"white"} />
                            ) : (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  source={updateIcon}
                                  style={{
                                    width: 18,
                                    height: 15,
                                    resizeMode: "contain",
                                  }}
                                />
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 14,
                                    fontFamily: "openSans_bold",
                                    marginLeft: 15,
                                  }}
                                >
                                  Update
                                </Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      )}
                      leftOpenValue={150}
                      rightOpenValue={-150}
                    />
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
          <RegularButton
            onPress={() => navigation.navigate("mixtureAdd")}
            text={"Add a Mixture"}
            style={{ borderRadius: 10, marginTop: 20 }}
          />
        </View>
      )}
    </MainScreenContainer>
  );
};
