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
import pdfIcon from "../../../../assets/images/downloadBackPurple.png";
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
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

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
      style={{
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: primaryColor,
      }}
      source={image}
    />
    <Text
      style={{
        fontSize: 16,
        color: grayMenuText,
        marginLeft: 5,
        textTransform: "uppercase",
      }}
    >
      {label}:
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: grayMenuText,
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
    <Text
      style={{
        color: "black",
        fontSize: 30,
        marginTop: -20,
        marginRight: 10,
      }}
    >
      .
    </Text>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 150,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "openSans_semiBold",
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
          color: "black",
          marginLeft: 20,
          fontFamily: "openSans_semiBold",
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
      <Text
        style={{
          fontSize: 16,
          color: "black",
          fontFamily: "openSans_semiBold",
        }}
      >
        {step}.{" "}
      </Text>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "black",
            fontSize: device === "tablet" ? 18 : 16,
            fontFamily: "openSans_semiBold",
          }}
        >
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
    mixture: mixtures = [],
  } = isTab ? data : props?.route?.params?.data;

  return (
    <MainScreenContainer onPressRight={() => setdeleteModal(true)}>
      <HeadingBox heading={name} />
      <TouchableOpacity style={{ position: "absolute", right: 20 }}>
        <Image
          source={pdfIcon}
          style={{
            width: device === "tablet" ? 40 : 30,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
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

        <View style={{ width: "100%", marginTop: 10 }}>
          <FlatList
            numColumns={1}
            ListHeaderComponent={() => (
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
                    width: 150,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: grayMenuText,
                      textTransform: "uppercase",
                    }}
                  >
                    quantity and unit
                  </Text>
                </View>

                <View style={{ flex: 0.98 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: grayMenuText,
                      marginLeft: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    Ingredient
                  </Text>
                </View>
              </View>
            )}
            data={ingredients}
            renderItem={({ item }) => (
              <IngredientBox
                unit={item.units}
                name={item.itemName}
                value={item.quantity}
              />
            )}
          />
        </View>

        {mixtures.length > 0 ? (
          <View style={{ width: "100%", marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
                marginLeft: 10,
              }}
            >
              Mixtures
            </Text>

            <FlatList
              numColumns={1}
              ListHeaderComponent={() => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 10,
                    paddingTop: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 150,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: grayMenuText,
                        textTransform: "uppercase",
                      }}
                    >
                      Weight and unit
                    </Text>
                  </View>

                  <View style={{ flex: 0.98 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: grayMenuText,
                        marginLeft: 20,
                        textTransform: "uppercase",
                      }}
                    >
                      Mixture
                    </Text>
                  </View>
                </View>
              )}
              data={mixtures}
              renderItem={({ item }) => (
                <IngredientBox
                  unit={item.mixtureUnit}
                  name={item.mixtureTitle}
                  value={item.weight}
                />
              )}
            />
          </View>
        ) : null}

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
    </MainScreenContainer>
  );
};
