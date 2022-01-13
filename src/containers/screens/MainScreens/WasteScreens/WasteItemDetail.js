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

export const WasteDetailPage = ({ isTab, data, ...props }) => {
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
  } = props?.route?.params?.data;

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

  return (
    <MainScreenContainer onPressRight={() => setdeleteModal(true)}>
      <HeadingBox heading={name} />

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

        <View
          style={{
            width: "100%",
            marginTop: 50,
            flexDirection: device === "tablet" ? "row" : "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <RegularButton
            text={"donate to ubf"}
            onPress={() =>
              navigation.navigate("WasteItemAddForUbf", {
                data: props?.route?.params?.data,
              })
            }
            style={{ width: device === "tablet" ? "48%" : "100%" }}
          />
          <RegularButton
            text={"Sell with discount"}
            onPress={() =>
              navigation.navigate("WasteItemAddForDiscount", {
                data: props?.route?.params?.data,
              })
            }
            textStyle={{ color: primaryColor }}
            colors={["white", "white"]}
            style={{
              borderColor: primaryColor,
              borderWidth: 1,
              marginTop: device === "tablet" ? 0 : 20,
              width: device === "tablet" ? "48%" : "100%",
            }}
          />
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

// import React, { useState } from "react";
// import { ScrollView, View } from "react-native";
// import { useSelector } from "react-redux";
// import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
// import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";
// import { SearchInput } from "../../../../components/SearchInput/SearchInput";
// import { Text } from "../../../../components/Text/Text";
// import {
//   borderColor2,
//   chartHeaderColor,
//   grayTextColor,
// } from "../../../../theme/colors";
// import { MainScreenContainer } from "../../../MainScreenContainers";

// export const WasteItemDetail = () => {
//   const device = useSelector((state) => state.system.device);
//   const [search, setSearch] = useState("");
//   const [filteredItem, setFiltereditem] = useState([]);

//   const searchKeyword = (text) => {
//     const keyword = text?.toLowerCase();
//     const realData = [];
//     const finalData = realData.filter((item) =>
//       item.recipeTitle?.toLowerCase()?.includes(keyword)
//     );

//     setFiltereditem(finalData);
//   };

//   return (
//     <MainScreenContainer>
//       <HeadingBox heading={"Sunfiled Chicken Sliced"} />

//       <View
//         style={{
//           width: "90%",
//           alignItems: "center",
//           marginBottom: 50,
//           backgroundColor: "white",
//           borderRadius: 10,
//           marginTop: 20,
//         }}
//       >
//         <View style={{ width: "95%" }}>
//           <SearchInput
//             search={search}
//             setSearch={setSearch}
//             searchKeyword={searchKeyword}
//           />

//           <View
//             style={{ width: "100%", marginTop: device === "tablet" ? 20 : 0 }}
//           >
//             {device === "tablet" ? (
//               <View
//                 style={{
//                   width: "100%",
//                   marginBottom: 20,
//                   marginTop: 10,
//                 }}
//               >
//                 {/* headings start */}
//                 <View
//                   style={{
//                     width: "100%",
//                     flexDirection: "row",
//                     paddingVertical: 15,
//                     backgroundColor: chartHeaderColor,
//                     borderRadius: 10,
//                     borderBottomLeftRadius: 0,
//                     borderBottomRightRadius: 0,
//                   }}
//                 >
//                   <View style={{ flex: 1 }}>
//                     <Text
//                       style={{
//                         fontFamily: "openSans_bold",
//                         fontSize: 11,
//                         color: "black",
//                         marginLeft: 10,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       Recipe
//                     </Text>
//                   </View>
//                   <View style={{ width: 100 }}>
//                     <Text
//                       style={{
//                         fontFamily: "openSans_bold",
//                         fontSize: 11,
//                         color: "black",
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       total cost
//                     </Text>
//                   </View>
//                   <View style={{ width: 100 }}></View>
//                 </View>

//                 {/* headings ends */}
//                 <View style={{ backgroundColor: "white", width: "100%" }}>
//                   {[1, 2, 3].map((item, i) => (
//                     <View
//                       style={{
//                         width: "100%",
//                         flexDirection: "row",
//                         paddingVertical: 15,
//                         backgroundColor:
//                           i % 2 === 1 ? chartHeaderColor : "white",
//                         borderRadius: 10,
//                         borderBottomLeftRadius: 0,
//                         borderBottomRightRadius: 0,
//                       }}
//                     >
//                       <View style={{ flex: 1 }}>
//                         <Text
//                           style={{
//                             fontFamily: "openSans_semiBold",
//                             fontSize: 16,
//                             color: "black",
//                             marginLeft: 10,
//                           }}
//                         >
//                           One-Pan Honey Mustard Chicken
//                         </Text>
//                       </View>
//                       <View style={{ width: 100 }}>
//                         <Text
//                           style={{
//                             fontFamily: "openSans_semiBold",
//                             fontSize: 16,
//                             color: "black",
//                           }}
//                         >
//                           $ 10,30
//                         </Text>
//                       </View>
//                       <View style={{ width: 100 }}>
//                         <Text style={{ fontSize: 12, color: "#868686" }}>
//                           View Recipe
//                         </Text>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             ) : (
//               <>
//                 {[1, 2, 4].map((item, i) => (
//                   <View
//                     style={{
//                       width: "100%",
//                       paddingVertical: 15,
//                       backgroundColor: "white",
//                       borderBottomWidth: 1,
//                       borderColor: borderColor2,
//                     }}
//                   >
//                     <View style={{ width: "100%", flexDirection: "row" }}>
//                       <View style={{ flex: 1 }}>
//                         <View
//                           style={{
//                             width: "100%",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             flex: 1,
//                           }}
//                         >
//                           <View style={{ flex: 1, marginLeft: 10 }}>
//                             <Text
//                               style={{
//                                 flex: 0.9,
//                                 color: "black",
//                                 fontFamily: "openSans_semiBold",
//                                 fontSize: 16,
//                               }}
//                             >
//                               Chicken Piccata
//                             </Text>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               flex: 0.2,
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 flex: 0.9,
//                                 color: "black",
//                                 fontFamily: "openSans_semiBold",
//                                 fontSize: 16,
//                               }}
//                               numberOfLines={1}
//                             >
//                               $122
//                             </Text>
//                           </View>
//                         </View>
//                         <View
//                           style={{
//                             width: "100%",
//                             flexDirection: "row",
//                             alignItems: "flex-start",
//                             justifyContent: "flex-end",
//                             flex: 1,
//                             marginTop: 5,
//                           }}
//                         >
//                           <View
//                             style={{
//                               flex: 1,
//                               flexDirection: "row",
//                               alignItems: "flex-start",
//                               marginLeft: 10,
//                             }}
//                           >
//                             <Text
//                               style={{ color: grayTextColor, fontSize: 12 }}
//                             >
//                               View recipe
//                             </Text>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 ))}
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </MainScreenContainer>
//   );
// };
