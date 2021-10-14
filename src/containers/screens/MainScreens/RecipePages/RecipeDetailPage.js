import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  grayColor,
  grayMenuText,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import editIcon from "../../../../assets/images/editIcon.png";
import pdfIcon from "../../../../assets/images/pdfIcon.png";
import multiplePeopleIcon from "../../../../assets/images/multiplePeopleIcon.png";
import noMealAdded from "../../../../assets/images/noMealAdded.png";
import clock from "../../../../assets/images/clock.png";
import deletePurple from "../../../../assets/images/deletePurple.png";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../../components/Text/Text";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import * as actions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import { useNavigation } from "@react-navigation/core";

const IconBox = ({ image, label, value, style }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      ...style,
    }}
  >
    <Image
      style={{ width: 20, height: 20, resizeMode: "contain" }}
      source={image}
    />
    <Text
      style={{
        fontSize: 16,
        color: grayTextColor,
        marginLeft: 5,
        textTransform: "uppercase",
      }}
    >
      {label}:
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: grayTextColor,
        marginLeft: 5,
        textTransform: "uppercase",
      }}
    >
      {value}
    </Text>
  </View>
);

const IngredientBox = ({ value, unit, name }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      padding: 10,
      paddingTop: 0,
      alignItems: "center",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 90,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "openSans_bold",
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "openSans_bold",
          marginLeft: 5,
        }}
      >
        {unit}
      </Text>
    </View>

    <View style={{ flex: 0.98 }}>
      <Text
        style={{
          fontSize: 16,
          color: grayMenuText,
          marginLeft: 5,
        }}
      >
        {name}
      </Text>
    </View>
  </View>
);

const RecipeBox = ({ step, recipe }) => {
  const device = useSelector((state) => state.system.device);
  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: recipe.length < 100 ? "center" : "flex-start",
      }}
    >
      <View style={{ width: 60, marginTop: recipe.length < 100 ? 0 : 10 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: primaryColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>{step}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: device === "tablet" ? 18 : 16 }}>
          {recipe}
        </Text>
      </View>
    </View>
  );
};

export const RecipeDetailPage = ({ isTab, data, ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const deleteLoading = useSelector(
    (state) => state.recipe.deleteRecipe.isLoading
  );
  const deleteError = useSelector((state) => state.recipe.deleteRecipe.isError);

  const {
    recipeTitle: name,
    macroIngredient,
    catalogId,
    recipeType,
    recipeSteps,
    locationId,
    ingredients,
    cookingTime,
    clientId,
    serving,
  } = isTab ? data : props?.route?.params?.data;

  const [deleteModal, setdeleteModal] = useState(false);

  const onDeleteRecipe = () => {
    dispatch(
      actions.deleteRecipeAction({
        catalogId,
        locationId,
        clientId,
        navigation,
      })
    );
  };

  useEffect(() => {
    if (!deleteError) return;

    setdeleteModal(false);
  }, [deleteError]);

  if (isTab) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              flex: 1,
              alignItems: "center",
              backgroundColor: "white",
              marginVertical: 20,
              borderRadius: 10,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: grayColor,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                paddingVertical: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  fontFamily: "openSans_bold",
                  flex: 0.9,
                }}
                numberOfLines={1}
              >
                {name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isTab && (
                  <TouchableOpacity
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      marginRight: 20,
                    }}
                    onPress={() => setdeleteModal(true)}
                  >
                    <Image
                      source={deletePurple}
                      style={{
                        tintColor: primaryShade1,
                        width: device === "tablet" ? 30 : 20,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Image
                  source={pdfIcon}
                  style={{
                    tintColor: primaryShade1,
                    width: device === "tablet" ? 30 : 20,
                    resizeMode: "contain",
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: device === "tablet" ? 30 : 20,
                    marginRight: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("recipeAdd", {
                      data: isTab ? data : props?.route?.params?.data,
                    })
                  }
                >
                  <Image
                    source={editIcon}
                    style={{
                      tintColor: primaryShade1,
                      width: device === "tablet" ? 30 : 20,
                      resizeMode: "contain",
                      marginLeft: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {device === "tablet" ? (
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: grayColor,
                }}
              >
                <View style={{ flex: 0.98 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Ingredients
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: grayMenuText,
                      fontFamily: "openSans_semiBold",
                      marginTop: 5,
                    }}
                  >
                    Macro ingredient: {macroIngredient.itemName}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconBox
                    image={multiplePeopleIcon}
                    label={"Serving"}
                    value={serving}
                  />
                  <IconBox
                    style={{ marginLeft: 20 }}
                    image={noMealAdded}
                    label={"Type"}
                    value={recipeType}
                  />
                  <IconBox
                    style={{ marginLeft: 20 }}
                    image={clock}
                    label={"Cooking"}
                    value={cookingTime}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: grayColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Ingredients
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: grayMenuText,
                    fontFamily: "openSans_semiBold",
                    marginTop: 5,
                  }}
                  numberOfLines={1}
                >
                  Macro ingredient: {macroIngredient.itemName}
                </Text>
                <View style={{ width: "100%" }}>
                  <IconBox
                    image={multiplePeopleIcon}
                    label={"Serving"}
                    value={serving}
                  />
                  <IconBox
                    image={noMealAdded}
                    label={"Type"}
                    value={recipeType}
                  />
                  <IconBox
                    image={clock}
                    label={"Cooking"}
                    value={cookingTime}
                  />
                </View>
              </View>
            )}

            <View style={{ width: "100%", marginTop: 10 }}>
              <FlatList
                numColumns={device === "tablet" ? 2 : 1}
                data={ingredients}
                renderItem={({ item }) => (
                  <IngredientBox
                    unit={item.unit}
                    name={item.itemName}
                    value={item.quantity}
                  />
                )}
              />
            </View>

            <View
              style={{ width: "100%", marginTop: 20, paddingHorizontal: 10 }}
            >
              <View
                style={{
                  width: "100%",
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: grayColor,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Recipe
                </Text>
              </View>

              <View style={{ width: "100%", marginTop: 10 }}>
                {recipeSteps.map((item, i) => (
                  <RecipeBox step={i + 1} recipe={item.description} />
                ))}
              </View>
            </View>
          </View>

          <DeleteModal
            onRequestClose={() => setdeleteModal(false)}
            visible={deleteModal}
            isLoading={deleteLoading}
            onDelete={onDeleteRecipe}
            heading={"Delete Recipe?"}
            deleteItemText={"this recipe?"}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <MainScreenContainer
      rightImage={deleteIconWhite}
      title={"Recipe Engineering"}
      onPressRight={() => setdeleteModal(true)}
    >
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          marginVertical: 20,
          borderRadius: 10,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: grayColor,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            paddingVertical: 0,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "black",
              fontFamily: "openSans_bold",
              flex: 0.9,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={pdfIcon}
              style={{
                tintColor: primaryShade1,
                width: device === "tablet" ? 30 : 20,
                resizeMode: "contain",
              }}
            />
            <TouchableOpacity
              style={{
                width: device === "tablet" ? 30 : 20,
                marginRight: 20,
              }}
              onPress={() =>
                navigation.navigate("recipeAdd", {
                  data: isTab ? data : props?.route?.params?.data,
                })
              }
            >
              <Image
                source={editIcon}
                style={{
                  tintColor: primaryShade1,
                  width: device === "tablet" ? 30 : 20,
                  resizeMode: "contain",
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {device === "tablet" ? (
          <View
            style={{
              width: "100%",
              marginTop: 10,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: grayColor,
            }}
          >
            <View style={{ flex: 0.98 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontFamily: "openSans_bold",
                }}
              >
                Ingredients
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: grayMenuText,
                  fontFamily: "openSans_semiBold",
                  marginTop: 5,
                }}
              >
                Macro ingredient: {macroIngredient.itemName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconBox
                image={multiplePeopleIcon}
                label={"Serving"}
                value={serving}
              />
              <IconBox
                style={{ marginLeft: 20 }}
                image={noMealAdded}
                label={"Type"}
                value={recipeType}
              />
              <IconBox
                style={{ marginLeft: 20 }}
                image={clock}
                label={"Cooking"}
                value={cookingTime}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              marginTop: 10,
              padding: 10,
              borderBottomWidth: 1,
              borderColor: grayColor,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Ingredients
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: grayMenuText,
                fontFamily: "openSans_semiBold",
                marginTop: 5,
              }}
              numberOfLines={1}
            >
              Macro ingredient: {macroIngredient.itemName}
            </Text>
            <View style={{ width: "100%" }}>
              <IconBox
                image={multiplePeopleIcon}
                label={"Serving"}
                value={serving}
              />
              <IconBox image={noMealAdded} label={"Type"} value={recipeType} />
              <IconBox image={clock} label={"Cooking"} value={cookingTime} />
            </View>
          </View>
        )}

        <View style={{ width: "100%", marginTop: 10 }}>
          <FlatList
            numColumns={device === "tablet" ? 2 : 1}
            data={ingredients}
            renderItem={({ item }) => (
              <IngredientBox
                unit={item.unit}
                name={item.itemName}
                value={item.quantity}
              />
            )}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20, paddingHorizontal: 10 }}>
          <View
            style={{
              width: "100%",
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: grayColor,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Recipe
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 10 }}>
            {recipeSteps.map((item, i) => (
              <RecipeBox step={i + 1} recipe={item.description} />
            ))}
          </View>
        </View>
      </View>

      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
        isLoading={deleteLoading}
        onDelete={onDeleteRecipe}
        heading={"Delete Recipe?"}
        deleteItemText={"this recipe?"}
      />
    </MainScreenContainer>
  );
};
