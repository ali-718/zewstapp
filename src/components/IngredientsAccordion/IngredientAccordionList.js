import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { borderColor2, grayMenuText } from "../../theme/colors";
import deleteIcon from "../../assets/images/deleteIcon.png";
import arrowDownIcon from "../../assets/images/arrowDownIcon.png";
import { Dropdown } from "../Inputs/DropDown";
import { Text } from "../Text/Text";
import { Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import {
  getUpdatedQuantitynUnit,
  inventoryCategory,
  recipePacking,
  validConversionUnits,
} from "../../helpers/utlils";

export const IngredientAccordionList = ({
  ingredients,
  inventoryList,
  macroIngredient,
  i,
  item,
  updateQuantity,
  updatePacking,
  updateName,
  deleteIngredient,
  updateUnit,
  allUnits,
  isMixture
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          marginTop: 0,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 10,
          borderWidth: 2,
          borderColor: borderColor2,
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            flex: 1,
          }}
        >
          {!isMixture ?  ingredients[i].itemName : ingredients[i].mixtureTitle}
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginRight: 10,
            color: grayMenuText,
          }}
        >
          {!isMixture ? ingredients[i].quantity : ingredients[i].weight} {ingredients[i].units}
        </Text>
        <Image
          style={{
            width: 15,
            height: 15,
            resizeMode: "contain",
            marginRight: 15,
          }}
          source={arrowDownIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            width: "100%",
            padding: 10,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => deleteIngredient(i)}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                marginBottom: 10,
              }}
              source={deleteIcon}
            />
          </TouchableOpacity>
          <Dropdown
            errMsg={isMixture ? "Looks like there is no mixture available 😞": "Looks like there are no items left in inventory 😞"}
            selectedMenu={isMixture ? ingredients[i].mixtureTitle : ingredients[i].itemName}
            setMenu={(val) =>
              updateName(
                inventoryList
                  .map(isMixture ? (item) => ({
                    ...item,
                    totalWeight: item.mixtureWeight,
                    weight: undefined,
                    originalUnit: item.mixtureUnit,
                  }) : (item) => ({
                    ...item,
                    totalQuantity: item.quantity,
                    quantity: undefined,
                    originalUnit: item.units,
                  }))
                  .find(isMixture ? (item) => item.mixtureTitle === val : (item) => item.itemName === val),
                i
              )
            }
            placeholder={isMixture  ? "Mixture" :"Ingredients"}
            menus={inventoryList
              .filter(isMixture ? (item) =>
              ingredients.filter((val) => val.mixtureTitle === item.mixtureTitle)
                .length === 0 : 
                (item) =>
                  ingredients.filter((val) => val.itemName === item.itemName)
                    .length === 0
              )
              .map(isMixture ? (item) => item.mixtureTitle : (item) => item.itemName)}
            style={{ zIndex: i + 3 }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            {console.log(
              getUpdatedQuantitynUnit(
                ingredients[i]?.originalUnit,
                item.units,
                parseInt( isMixture ? ingredients[i].totalWeight : ingredients[i].totalQuantity)
              )
            )}
            {ingredients[i].[isMixture ? 'mixtureTitle' :'itemName'] && (
              <Dropdown
                selectedMenu={isMixture ? ingredients[i].weight : ingredients[i].quantity}
                setMenu={(val) => updateQuantity(val, i)}
                placeholder={"Quantity"}
                menus={Array.from( isMixture ? 
                  {
                    length: getUpdatedQuantitynUnit(
                      ingredients[i]?.originalUnit,
                      item.units,
                      parseInt(ingredients[i].totalWeight)
                    )?.quantity,
                  }
                  :
                  {
                    length: getUpdatedQuantitynUnit(
                      ingredients[i]?.originalUnit,
                      item.units,
                      parseInt(ingredients[i].totalQuantity)
                    )?.quantity,
                  },
                  (_, i) => i + 1
                )}
                style={{ zIndex: i + 2, flex: 1 }}
                invetoryItems
              />
            )}

            {ingredients[i].[isMixture ? 'mixtureTitle' :'itemName'] && (
              <Dropdown
                selectedMenu={item.units}
                setMenu={(val) => updateUnit(val, i)}
                placeholder={"Unit"}
                menus={validConversionUnits(ingredients[i]?.originalUnit)}
                style={{
                  zIndex: i + 1,
                  flex: 1,
                }}
              />
            )}
          </View>

          {/* <Dropdown
            selectedMenu={item.type}
            setMenu={(val) => updatePacking(val, i)}
            placeholder={"Fresh/Packed"}
            menus={recipePacking}
            style={{
              zIndex: 0,
              flex: 1,
              borderBottomWidth: 0,
            }}
          /> */}
        </View>
      )}
    </View>
  );
};
