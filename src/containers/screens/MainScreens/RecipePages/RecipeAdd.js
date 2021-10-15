import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { grayColor, primaryColor } from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { Text } from "../../../../components/Text/Text";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Entypo } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { recipePacking, recipeUnit } from "../../../../helpers/utlils";
import deleteIcon from "../../../../assets/images/deleteIcon.png";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { ToastError } from "../../../../helpers/Toast";
import { useNavigation } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import * as inventoryActions from "../../../../Redux/actions/InventoryAction/InventoryActions";

export const RecipeAdd = (props) => {
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const inventoryList = useSelector((state) => state.inventory.inventory.list);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [macroIngredient, setMacroIngredient] = useState({});
  const [quantity, setquantity] = useState("");
  const [serving, setServing] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [type, settype] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [coveredIngredients, setcoveredIngredients] = useState([]);
  const [recipeList, setrecipeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const isLoading = useSelector((state) => state.recipe.addRecipe.isLoading);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );

  useEffect(() => {
    const data = props.route?.params?.data;

    dispatch(
      inventoryActions.fetchInventoryAction({
        locationId: defaultLocation.locationId,
      })
    );

    if (!data) return;

    setIsEdit(true);

    const {
      clientId,
      locationId,
      recipeTitle,
      macroIngredient,
      serving,
      recipeType,
      cookingTime,
      ingredients,
      recipeSteps,
    } = data;

    setTitle(recipeTitle);
    setMacroIngredient(macroIngredient);
    setServing(serving);
    setCookingTime(cookingTime);
    settype(recipeType);
    setIngredients(ingredients);
    setrecipeList(recipeSteps);
    setquantity(macroIngredient?.quantity);
  }, []);

  const onAddData = () => {
    if (!defaultLocation.locationId) {
      ToastError("No primary location selected!");
      return;
    }

    if (
      title.trim().length === 0 ||
      !macroIngredient.itemName ||
      serving.trim().length === 0 ||
      cookingTime.trim().length === 0 ||
      quantity === "" ||
      type.trim().length === 0
    ) {
      ToastError("Please fill all fields");
      return;
    }

    if (ingredients.length === 0) {
      ToastError("Please add atleast 1 ingredient");
      return;
    }

    if (recipeList.length === 0) {
      ToastError("Please add atleast 1 Step");
      return;
    }

    if (isEdit) {
      const data = {
        clientId: user.clientId,
        locationId: defaultLocation?.locationId,
        recipeTitle: title,
        macroIngredient: { ...macroIngredient, quantity },
        serving,
        recipeType: type,
        cookingTime: cookingTime,
        ingredients,
        recipeSteps: recipeList,
        navigation,
        catalogId: props.route?.params?.data?.catalogId,
      };

      dispatch(actions.updateRecipeAction(data));
      return;
    }

    const data = {
      clientId: user.clientId,
      locationId: defaultLocation?.locationId,
      recipeTitle: title,
      macroIngredient: { ...macroIngredient, quantity },
      serving,
      recipeType: type,
      cookingTime: cookingTime,
      ingredients,
      recipeSteps: recipeList,
      navigation,
    };

    dispatch(actions.addRecipeAction(data));
  };

  const addRecipe = (id) => {
    setrecipeList([...recipeList, { id, order: id, description: "" }]);
  };

  const addRecipeDescription = (value, index) => {
    const data = [...recipeList];

    data[index] = { ...data[index], description: value };

    setrecipeList(data);
  };

  const deleteRecipe = (index) => {
    const data = [...recipeList];

    data.splice(index, 1);

    setrecipeList([...data]);
  };

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

  const deleteIngredient = (index) => {
    const data = [...ingredients];

    data.splice(index, 1);

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

    setIngredients(data);
  };

  const updateName = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], ...value };
    coveredIngredients[index] = { name: value.itemName };

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

            <Dropdown
              selectedMenu={macroIngredient.itemName}
              setMenu={(val) =>
                setMacroIngredient(
                  inventoryList
                    .map((item) => ({
                      ...item,
                      totalQuantity: item.quantity,
                      quantity: undefined,
                    }))
                    .find((item) => item.itemName === val)
                )
              }
              placeholder={"Macro Ingredients*"}
              menus={inventoryList
                .filter(
                  (item) =>
                    item.itemName !== macroIngredient.itemName &&
                    ingredients.filter((val) => val.itemName === item.itemName)
                      .length === 0
                )
                .map((item) => item.itemName)}
              style={{ zIndex: 3 }}
            />

            {macroIngredient.totalQuantity && (
              <Dropdown
                selectedMenu={quantity}
                setMenu={setquantity}
                placeholder={"Quantity*"}
                menus={Array.from(
                  { length: macroIngredient.totalQuantity },
                  (_, i) => i + 1
                )}
                style={{ zIndex: 2 }}
              />
            )}

            <Input
              keyboardType={"number-pad"}
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
              style={{ zIndex: 1 }}
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
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 40,
              zIndex: 0,
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

            {recipeList.map((item, i) => (
              <View
                key={i}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  zIndex: -1,
                }}
              >
                <TouchableOpacity
                  onPress={() => deleteRecipe(i)}
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={deleteIcon}
                  />
                </TouchableOpacity>

                <Input
                  placeholder={`Step ${i + 1}`}
                  setValue={(val) => addRecipeDescription(val, i)}
                  style={{
                    borderColor: grayColor,
                    borderBottomWidth: 2,
                    borderRadius: 0,
                    flex: 1,
                    zIndex: 0,
                  }}
                  value={item.description}
                />
              </View>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => addRecipe(recipeList.length + 1)}
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
                Add Step
              </Text>
            </TouchableOpacity>
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
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => deleteIngredient(i)}
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={deleteIcon}
                  />
                </TouchableOpacity>

                <Dropdown
                  selectedMenu={ingredients[i].itemName}
                  setMenu={(val) =>
                    updateName(
                      inventoryList
                        .map((item) => ({
                          ...item,
                          totalQuantity: item.quantity,
                          quantity: undefined,
                        }))
                        .find((item) => item.itemName === val),
                      i
                    )
                  }
                  placeholder={"Micro Ingredients*"}
                  menus={inventoryList
                    .filter(
                      (item) =>
                        item.itemName !== macroIngredient.itemName &&
                        ingredients.filter(
                          (val) => val.itemName === item.itemName
                        ).length === 0
                    )
                    .map((item) => item.itemName)}
                  style={{ zIndex: i + 3 }}
                />

                {ingredients[i].itemName && (
                  <Dropdown
                    selectedMenu={ingredients[i].quantity}
                    setMenu={(val) => updateQuantity(val, i)}
                    placeholder={"Quantity*"}
                    menus={Array.from(
                      { length: ingredients[i].totalQuantity },
                      (_, i) => i + 1
                    )}
                    style={{ zIndex: i + 2 }}
                  />
                )}

                <Dropdown
                  selectedMenu={item.type}
                  setMenu={(val) => updatePacking(val, i)}
                  placeholder={"Fresh/Packed*"}
                  menus={recipePacking}
                  style={{
                    zIndex: i + 1,
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

          <View style={{ width: "100%", marginTop: 20, zIndex: -1 }}>
            <RegularButton
              isLoading={isLoading}
              onPress={onAddData}
              text={isEdit ? "Update" : "Add"}
              style={{ borderRadius: 10 }}
            />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
