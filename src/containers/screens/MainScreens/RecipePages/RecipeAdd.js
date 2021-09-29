import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { grayColor, primaryColor } from "../../../../theme/colors";
import { nameValidator } from "../../../../helpers/rules";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { Text } from "../../../../components/Text/Text";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Entypo } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector } from "react-redux";
import { recipePacking, recipeUnit } from "../../../../helpers/utlils";

export const RecipeAdd = () => {
  const device = useSelector((state) => state.system.device);
  const [title, setTitle] = useState("");
  const [macroIngredient, setMacroIngredient] = useState("");
  const [serving, setServing] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [type, settype] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredients = () => {
    setIngredients([
      ...ingredients,
      { microIngredient: "", quantity: "", unit: "", type: "" },
    ]);
  };

  const updateUnit = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], unit: value };

    setIngredients(data);
  };

  const updateQuantity = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], quantity: value };

    setIngredients(data);
  };

  const updatePacking = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], type: value };

    console.log(data);
    console.log(ingredients);

    setIngredients(data);
  };

  const updateName = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], microIngredient: value };

    setIngredients(data);
  };

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
          marginBottom: 200,
        }}
      >
        <View
          style={{
            width: "95%",
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <Input
            placeholder={"Recipe Title*"}
            value={title}
            setValue={(val) => setTitle(val)}
            style={{
              borderColor: grayColor,
              borderBottomWidth: 2,
              marginTop: 10,
              borderRadius: 0,
            }}
          />

          <View
            style={{ width: "100%", flexDirection: "column", marginTop: 20 }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Recipe Details
            </Text>

            <Input
              placeholder={"Macro Ingredients*"}
              value={macroIngredient}
              setValue={(val) => setMacroIngredient(val)}
              style={{
                borderColor: grayColor,
                borderBottomWidth: 2,
                borderRadius: 0,
              }}
            />

            <Input
              placeholder={"Serving*"}
              value={serving}
              setValue={(val) => setServing(val)}
              style={{
                borderColor: grayColor,
                borderBottomWidth: 2,
                marginTop: 10,
                borderRadius: 0,
                marginBottom: 10,
              }}
            />

            <Dropdown
              selectedMenu={type}
              setMenu={settype}
              placeholder={"Type*"}
              menus={["completed", "pending"]}
            />

            <Input
              keyboardType={"number-pad"}
              placeholder={"Cooking time (mins)*"}
              value={cookingTime}
              setValue={(val) => setCookingTime(val)}
              style={{
                borderColor: grayColor,
                borderBottomWidth: 2,
                marginTop: 10,
                borderRadius: 0,
              }}
            />
          </View>

          <View
            style={{ width: "100%", flexDirection: "column", marginTop: 20 }}
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

            {ingredients.map((item, i) => (
              <View
                key={i}
                style={{
                  width: "100%",
                  zIndex: ingredients.length - i,
                  flexDirection: device === "tablet" ? "row" : "column",
                  justifyContent: "space-between",
                  alignItems: device === "tablet" ? "center" : "flex-start",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: primaryColor,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>{i + 1}</Text>
                </View>
                <Input
                  placeholder={"Micro Ingredients*"}
                  setValue={(val) => updateName(val, i)}
                  style={{
                    borderColor: grayColor,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    flex: device === "tablet" ? 0.8 : 1,
                  }}
                />

                <Input
                  keyboardType={"number-pad"}
                  placeholder={"Quantity*"}
                  setValue={(val) => updateQuantity(val, i)}
                  style={{
                    borderColor: grayColor,
                    borderBottomWidth: 2,
                    marginVertical: device === "tablet" ? 0 : 10,
                    borderRadius: 0,
                    width: device === "tablet" ? 100 : "100%",
                    // marginLeft: device === "tablet" ? 10 : 0,
                  }}
                />

                <Dropdown
                  selectedMenu={item.unit}
                  setMenu={(val) => updateUnit(val, i)}
                  placeholder={"Unit*"}
                  menus={recipeUnit}
                  style={{
                    zIndex: 2,
                    width: device === "tablet" ? 100 : "100%",
                  }}
                />

                <Dropdown
                  selectedMenu={item.type}
                  setMenu={(val) => updatePacking(val, i)}
                  placeholder={"Fresh/Packed*"}
                  menus={recipePacking}
                  style={{
                    zIndex: 1,
                    marginTop: device === "tablet" ? 0 : 5,
                    width: device === "tablet" ? 180 : "100%",
                  }}
                />
              </View>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={addIngredients}
            >
              <Icon
                name={"plus"}
                as={Entypo}
                style={{
                  fontSize: device === "tablet" ? 30 : 20,
                  color: primaryColor,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: primaryColor,
                  fontFamily: "openSans_bold",
                  marginLeft: 10,
                }}
              >
                Add Ingredients
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
