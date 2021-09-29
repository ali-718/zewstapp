import React from "react";
import { View, Image, FlatList } from "react-native";
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
import { useSelector } from "react-redux";
import { Text } from "../../../../components/Text/Text";

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

export const RecipeDetailPage = (props) => {
  const device = useSelector((state) => state.system.device);
  const { name = "Alfredo Pasta" } = props;

  return (
    <MainScreenContainer
      rightImage={""}
      title={"Recipe Engineering"}
      onPressRight={() => null}
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
            <Image
              source={editIcon}
              style={{
                tintColor: primaryShade1,
                width: device === "tablet" ? 30 : 20,
                resizeMode: "contain",
                marginLeft: 20,
              }}
            />
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
                Macro ingredient: Chicken Chicken Chicken
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
                value={"4"}
              />
              <IconBox
                style={{ marginLeft: 20 }}
                image={noMealAdded}
                label={"Type"}
                value={"Complete"}
              />
              <IconBox
                style={{ marginLeft: 20 }}
                image={clock}
                label={"Cooking"}
                value={"10 mins"}
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
              Macro ingredient: Chicken
            </Text>
            <View style={{ width: "100%" }}>
              <IconBox
                image={multiplePeopleIcon}
                label={"Serving"}
                value={"4"}
              />
              <IconBox image={noMealAdded} label={"Type"} value={"Complete"} />
              <IconBox image={clock} label={"Cooking"} value={"10 mins"} />
            </View>
          </View>
        )}

        <View style={{ width: "100%", marginTop: 10 }}>
          <FlatList
            numColumns={device === "tablet" ? 2 : 1}
            data={[
              { unit: "oz", value: 3, name: "Pasta Unsalted" },
              {
                unit: "oz",
                value: 3,
                name: "Pasta Unsalted in a home of mine hah ha ha",
              },
              { unit: "cloves", value: 3, name: "Pasta Unsalted" },
              { unit: "cup", value: 3, name: "Pasta Unsalted" },
              { unit: "oz", value: 3, name: "Pasta Unsalted" },
            ]}
            renderItem={({ item }) => (
              <IngredientBox
                unit={item.unit}
                name={item.name}
                value={item.value}
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
            <RecipeBox
              step={1}
              recipe={"Cook the pasta according to the package instructions"}
            />
            <RecipeBox
              step={2}
              recipe={
                "Add the garlic and cook for 30 seconds, or until fragrant. Pour in the milk and cream. Stir consistently to Add the garlic and cook for 30 seconds, or until fragrant. Pour in the milk and cream. Stir consistently to"
              }
            />
            <RecipeBox
              step={3}
              recipe={"Cook the pasta according to the package instructions"}
            />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
